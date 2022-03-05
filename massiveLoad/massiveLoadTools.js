const fs = require('fs');

exports.generateMongoObjectId = function () {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    return (
      timestamp +
      'xxxxxxxxxxxxxxxx'
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
};

exports.getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

exports.formatJsonToBeWrittenToAFile = function (jsonData) {
  // convert JSON object to string
  return JSON.stringify(jsonData, null, '\t');
};

exports.saveJsonFile = function (jsonData, filePath) {
  // truncate file
  fs.truncate(filePath, 0, function () {
    console.log('File ' + filePath + ' truncated');
  });

  // write JSON string to a file
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      'JSON data has been successfully saved in file ' + filePath + '.'
    );
  });
};