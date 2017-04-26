const getFileDetails = require('./fileDetailsWorker.js');
const downloadFiles = require('./downloadWorker.js');
const convertSpeech = require('./speechConvertWorker.js');
const analyzeText = require('./nlpWorker.js');

const workers = [
  getFileDetails,
  downloadFiles,
  convertSpeech,
  analyzeText
];

module.exports.start = () => {
  workers.forEach((worker) => {
    return worker.start();
  });
};
