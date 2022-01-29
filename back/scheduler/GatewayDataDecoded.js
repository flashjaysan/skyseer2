/**
* GatewayDataDecoded class.
*/
class GatewayDataDecoded {
  /**
  * Constructor.
  * @param {number} dataNumber gateway data number.
  * @param {Date} dataDate gateway data's date.
  * @param {string} imei gateway data's imei serial.
  * @param {Date} rtcTime gateway data's RTC time.
  * @param {number} alarmType gateway data's alarm type.
  * @param {boolean} isConnectedToPower gateway is connected to power supply.
  * @param {number} batteryVoltage gateway's battery voltage.
  * @param {number} powerVoltage gateway's power voltage.
  * @param {number} tagsNumber gateway data's number of tags.
  * @param {Tag[]} tags gateway's decoded tags as an array of Tag objects.
  */
  constructor(dataNumber,
      dataDate,
      imei,
      rtcTime,
      alarmType,
      isConnectedToPower,
      batteryVoltage,
      powerVoltage,
      tagsNumber,
      tags) {
    this.dataNumber = dataNumber;
    this.dataDate = dataDate;
    this.imei = imei;
    this.rtcTime = rtcTime;
    this.alarmType = alarmType;
    this.isConnectedToPower = isConnectedToPower;
    this.batteryVoltage = batteryVoltage;
    this.powerVoltage = powerVoltage;
    this.tagsNumber = tagsNumber;
    this.tags = tags;
  }
}

module.exports = GatewayDataDecoded;
