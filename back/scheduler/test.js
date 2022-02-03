const gatewayData = {
  "date": "2022-02-01T18:13:23.000Z",
  "imei": "0x0641884907900004",
  "alarmType": "",
  "isConnectedToPower": true,
  "batteryVoltage": 4.2,
  "powerVoltage": 12.12,
  "tagsNumber": 2,
  "tags": [
    {
      "sensorSerial": 102245984,
      "batteryVoltageAlertStatus": false,
      "temperatureAlertStatus": false,
      "abnormalTemperatureStatus": false,
      "humidityAlertStatus": true,
      "batteryVoltage": 3.576,
      "temperature": 4.5,
      "humidity": 255,
      "rssi": -56
    },
    {
      "sensorSerial": 1645748787,
      "batteryVoltageAlertStatus": false,
      "temperatureAlertStatus": false,
      "abnormalTemperatureStatus": false,
      "humidityAlertStatus": false,
      "batteryVoltage": 3.67,
      "temperature": 18.7,
      "humidity": 57,
      "rssi": -55
    }
  ]
}

const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'skyseer',
  user: 'postgres',
  password: 'root'
});
client.connect();
const req = `INSERT INTO gateways (imei) VALUES ('${gateway.imei}') RETURNING id;`;
client.query(req, (err, res) => {
  if (res) {
    const gatewayId = res.rows[0].id;
    const req = `INSERT INTO gateways_statuses (time, alarm_type, is_connected_to_power, battery_voltage, power_voltage, gateway_id) VALUES ('${gatewayData.date}', '${gatewayData.alarmType}', '${gatewayData.isConnectedToPower}', ${gatewayData.batteryVoltage}, ${gatewayData.powerVoltage}, '${gatewayId}');`;
    client.query(req, (err, res) => {});
    client.end();
  }
});
const transferToDatabase = () => {

};
