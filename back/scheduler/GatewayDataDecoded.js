/**
* GatewayDataDecoded class.
*/
class GatewayDataDecoded {
  /**
  * Constructor.
  * @param {Date} date gateway data's date.
  * @param {string} imei gateway data's imei serial.
  * @param {string} alarmType gateway data's alarm type.
  * @param {boolean} isConnectedToPower gateway is connected to power supply.
  * @param {number} batteryVoltage gateway's battery voltage.
  * @param {number} powerVoltage gateway's power voltage.
  * @param {number} tagsNumber gateway data's number of tags.
  * @param {Tag[]} tags gateway's decoded tags as an array of Tag objects.
  */
  constructor(
      date,
      imei,
      alarmType,
      isConnectedToPower,
      batteryVoltage,
      powerVoltage,
      tagsNumber,
      tags) {
    this.date = date;
    this.imei = imei;
    this.alarmType = alarmType;
    this.isConnectedToPower = isConnectedToPower;
    this.batteryVoltage = batteryVoltage;
    this.powerVoltage = powerVoltage;
    this.tagsNumber = tagsNumber;
    this.tags = tags;
  }
}

module.exports = GatewayDataDecoded;
