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
  // affiche simplement les données dans la console pour le moment
  console.log(JSON.stringify(gatewayDataDecodedArray));
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
