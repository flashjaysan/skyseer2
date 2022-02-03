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
    const date = new Date(gatewayDataRaw.date);
    const rawData = gatewayDataRaw.rawData;
    const rawDataLength = rawData.length;
    const imei = this.convertImei(rawData.substring(24, 40));
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

    return new GatewayDataDecoded(
        date,
        imei,
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
  * converts a hexadecimal string to a gateway's alarm type.
  * @param {string} hexString gateway's raw data as a hexadecimal string.
  * @return {string} gateway's decoded alarm type.
  */
  static convertAlarmType(hexString) {
    const alarmNumber = parseInt(hexString, 16);
    switch (alarmNumber) {
      case 0x10:
        return 'low battery';
        break;
      case 0x60:
        return 'begin charge';
        break;
      case 0x61:
        return 'ending charge';
        break;
      default:
        return '';
    }
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
