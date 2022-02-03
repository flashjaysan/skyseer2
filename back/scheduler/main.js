// modules import
const schedule = require('node-schedule');
const axios = require('axios');
const {Client} = require('pg');

// needed classes
const GatewayDataRaw = require('./GatewayDataRaw.js');
const GatewayDataDecoder = require('./GatewayDataDecoder.js');

// configuration file import
const config = require('./config.json');
const gatewayUrl = config.gatewayUrl;
const connectionObject = config.connectionObject;

// stocke les données de la gateway dans un tableau et le renvoie
const storeRawData = (responseData) => {
  const gatewayDataRawArray = [];
  responseData.forEach((item) => {
    const gatewayData = new GatewayDataRaw(item[1], item[2]);
    gatewayDataRawArray.push(gatewayData);
  });
  return gatewayDataRawArray;
};

// convertit les données brutes en données exploitables
const convertData = (gatewayDataRawArray) => {
  const gatewayDataDecodedArray = [];
  gatewayDataRawArray.forEach((item) => {
    const gatewayDataDecoded = GatewayDataDecoder.decode(item);
    gatewayDataDecodedArray.push(gatewayDataDecoded);
  });
  return gatewayDataDecodedArray;
};

// stocke les données exploitable dans la base de données
const storeConvertedDataIntoDatabase = (gatewayDataDecodedArray) => {
  const client = new Client(connectionObject);
  client.connect();

  // for each data
  gatewayDataDecodedArray.forEach((gatewayData) => {
    // insertion de la gateway si elle n'est pas déjà présente
    let gatewayId = client.query(`SELECT id FROM gateways where imei = ${gatewayData.imei};`);
    if (!gatewayId) {
      gatewayId = client.query(`INSERT INTO gateways (imei) VALUES ('${gatewayData.imei}') RETURNING id;`);
    }

    // insertion du status de la gateway s'il n'est pas déjà présent
    let gatewayStatus = client.query(`SELECT id FROM gateways_statuses where time = ${gatewayData.date} AND gateway_id = ${gatewayId};`);
    if (!gatewaystatus) {
      client.query(`INSERT INTO gateways_statuses (time, alarm_type, is_connected_to_power, battery_voltage,  power_voltage,  gateway_id) VALUES ('${gatewayData.date}', '${gatewayData.alarmType}', '${gatewayData.isConnectedToPower}', ${gatewayData.batteryVoltage}, ${gatewayData.powerVoltage}, ${gatewayId});`);
    }

    // for each tag inside the data
    gatewayData.tags.forEach((tag) => {
      // insertion du sensor s'il n'est pas déjà présent
      let sensorId = client.query(`SELECT id FROM sensors where serial_number = ${tag.sensorSerial};`);
      if (!sensorId) {
        sensorId = client.query(`INSERT INTO sensors (serial_number, gateway_id) VALUES (${tag.sensorSerial}, ${gatewayId});`);
      }

      // insertion du record s'il n'est pas déjà présent
      let recordId = client.query(`SELECT id FROM records where time = ${gatewayData.date} AND sensor_id = ${sensorId};`);
      if (!recordId) {
        client.query(`INSERT INTO records (time, sensor_id, battery_voltage_alert, temperature_alert, abnormal_temperature_alert, humidity_alert, battery_voltage, rssi, temperature, humidity) VALUES ('${gatewayData.date}', ${tagId}, ${tag.batteryVoltageAlertStatus}, ${tag.temperatureAlertStatus}, ${tag.abnormalTemperatureStatus}, ${tag.humidityAlertStatus}, ${tag.batteryVoltage}, ${tag.rssi}, ${tag.temperature}, ${tag.humidity});`);
      }
    });
  });

  client.end();
};

// fonction générale appelée à chaque accès à la gateway
// appelle tour à tour les fonctions nécessaires au
// décodage puis stockage en base
const processResponse = (response) => {
  const gatewayDataRawArray = storeRawData(response.data);
  const gatewayDataDecodedArray = convertData(gatewayDataRawArray);
  storeConvertedDataIntoDatabase(gatewayDataDecodedArray);
};

// accès à la gateway et traitement de la réponse
const processGatewayData = () => {
  axios.get(gatewayUrl)
      .then(processResponse)
      .catch((error) => {
        console.log(error);
      });
};

// planifie l'accès régulier à la gateway
const main = () => {
  processGatewayData();// pour lancer l'exécution immédiatement
  schedule.scheduleJob('*/4 * * * *', processGatewayData);
};

// lancement du processus général
main();
