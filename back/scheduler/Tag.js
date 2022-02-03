/**
* Tag class.
*/
class Tag {
  /**
  * Constructor.
  * @param {number} sensorSerial sensor serial.
  * @param {boolean} batteryVoltageAlertStatus tag battery voltage alert status.
  * @param {boolean} temperatureAlertStatus tag temperature alert status.
  * @param {boolean} abnormalTemperatureStatus tag abnormal temperature status.
  * @param {boolean} humidityAlertStatus tag humidity alert status.
  * @param {number} batteryVoltage tag battery voltage.
  * @param {number} temperature tag temperature.
  * @param {number} humidity tag humidity.
  * @param {number} rssi tag RSSI id.
  */
  constructor(
      sensorSerial,
      batteryVoltageAlertStatus,
      temperatureAlertStatus,
      abnormalTemperatureStatus,
      humidityAlertStatus,
      batteryVoltage,
      temperature,
      humidity,
      rssi) {
    this.sensorSerial = sensorSerial;
    this.batteryVoltageAlertStatus = batteryVoltageAlertStatus;
    this.temperatureAlertStatus = temperatureAlertStatus;
    this.abnormalTemperatureStatus = abnormalTemperatureStatus;
    this.humidityAlertStatus = humidityAlertStatus,
    this.batteryVoltage = batteryVoltage;
    this.temperature = temperature;
    this.humidity = humidity;
    this.rssi = rssi;
  }
}

module.exports = Tag;
