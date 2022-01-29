/**
* GatewayDataRaw class.
*/
class GatewayDataRaw {
  /**
  * Constructor.
  * @param {number} dataNumber gateway data number.
  * @param {string} rawData gateway hexadecimal raw data.
  * @param {string} date gateway data date.
  */
  constructor(dataNumber, rawData, date) {
    this.dataNumber = dataNumber;
    this.rawData = rawData;
    this.date = date;
  }
}

module.exports = GatewayDataRaw;
