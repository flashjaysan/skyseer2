/**
* GatewayDataRaw class.
*/
class GatewayDataRaw {
  /**
  * Constructor.
  * @param {string} rawData gateway hexadecimal raw data.
  * @param {string} date gateway data date.
  */
  constructor(rawData, date) {
    this.rawData = rawData;
    this.date = date;
  }
}

module.exports = GatewayDataRaw;
