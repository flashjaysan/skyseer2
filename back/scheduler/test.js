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

const insert_gateway = (client) => {
  const req = `INSERT INTO gateways(imei) VALUES('${gatewayData.imei}');`;
  console.log(req);
  client.query(req, (err, res) => {
    if (!err) {
      console.log('insert into gateway table failure');
    } else {
      console.log('insert into gateway table success');
    }
    console.log(res);
    console.log(err);
    client.end();
  });
}

const {Client} = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'root'
});
//client.connect();
client.connect();
//insert_gateway(client);
//const req = `SELECT login, passwrd FROM USERS;`;
const req = 'INSERT INTO USERS (login, passwrd) VALUES (\'user2\', \'user2\');';
client.query(req, (err, res) => {
  console.log(res);
  console.log(err);
  client.end();
});

