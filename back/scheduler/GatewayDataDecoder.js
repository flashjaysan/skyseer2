const TagDecoder = require('./TagDecoder.js');
const GatewayDataDecoded = require('./GatewayDataDecoded.js');

/**
* GatewayDataDecoder class.
*/
class GatewayDataDecoder {
  /**
  * converts a GatewayDataRaw object into a GateWayDataDecoded one.
  * @param {GatewayDataRaw} gatewayDataRaw gateway raw data objet.
  * @return {GatewayDataDecoded} gateway decoded data objet.
  */
  static decode(gatewayDataRaw) {
    const dataNumber = gatewayDataRaw.dataNumber;
    const dataDate = new Date(gatewayDataRaw.date);
    const rawData = gatewayDataRaw.rawData;
    const rawDataLength = rawData.length;
    const imei = this.convertImei(rawData.substring(24, 40));
    const rtcTime = this.convertRtcTime(rawData.substring(40, 52));
    const alarmType = this.convertAlarmType(rawData.substring(60, 62));
    const isConnectedToPower = this.convertIsConnectedToPower(
        rawData.substring(62, 64));
    const batteryVoltage = this.convertBatteryVoltage(
        rawData.substring(68, 72));
    const powerVoltage = this.convertPowerVoltage(rawData.substring(72, 76));
    const tagsNumber = this.convertTagsNumber(rawData.substring(82, 84));
    const rawTagString = rawData.substring(86, rawDataLength - 12);
    const tags = [];
    for (let i = 0; i < tagsNumber; i++) {
      const tagString = rawTagString.substring(i * 22, (i + 1) * 22);
      tags.push(TagDecoder.decode(tagString));
    }

    return new GatewayDataDecoded(dataNumber,
        dataDate,
        imei,
        rtcTime,
        alarmType,
        isConnectedToPower,
        batteryVoltage,
        powerVoltage,
        tagsNumber,
        tags);
  }

  /**
  * converts a hexadecimal string to a gateway's IMEI.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {string} gateway's decoded IMEI.
  */
  static convertImei(hexString) {
    return '0x' + hexString;
  }

  /**
  * converts a hexadecimal string to a gateway's RTC time.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {Date} gateway's decoded RTC time.
  */
  static convertRtcTime(hexString) {
    const year = 2000 + parseInt(hexString.substring(0, 2), 16);
    const month = parseInt(hexString.substring(2, 4), 16);
    const day = parseInt(hexString.substring(4, 6), 16);
    const hour = parseInt(hexString.substring(6, 8), 16);
    const minutes = parseInt(hexString.substring(8, 10), 16);
    const secondes = parseInt(hexString.substring(10, 12), 16);
    return new Date(year.toString() + '-' +
        month.toString().padStart(2, '0') + '-' +
        day.toString().padStart(2, '0') + 'T' +
        hour.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        secondes.toString().padStart(2, '0'));
  }

  /**
  * converts a hexadecimal string to a gateway's alarm type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded alarm type.
  */
  static convertAlarmType(hexString) {
    return parseInt(hexString, 16);
  }

  /**
  * converts a hexadecimal string to a gateway's connected to power status.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {boolean} gateway's decoded connected to power status.
  */
  static convertIsConnectedToPower(hexString) {
    const hexValue = parseInt(hexString, 16);
    return (hexValue & 0x80) === 0x80;
  }

  /**
  * converts a hexadecimal string to a gateway's battery voltage.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded battery voltage.
  */
  static convertBatteryVoltage(hexString) {
    return parseInt(hexString, 16) / 100; // mV => V
  }

  /**
  * converts a hexadecimal string to a gateway's power voltage.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded power voltage.
  */
  static convertPowerVoltage(hexString) {
    return parseInt(hexString, 16) / 100; // mV => V
  }

  /**
  * converts a hexadecimal string to a gateway's tag number.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {number} gateway's decoded tag number.
  */
  static convertTagsNumber(hexString) {
    return parseInt(hexString, 16);
  }
}

module.exports = GatewayDataDecoder;
