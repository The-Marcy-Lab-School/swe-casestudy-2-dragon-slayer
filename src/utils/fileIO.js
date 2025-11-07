const { readFileSync, writeFileSync } = require('node:fs');

// Uses readFileSync to read JSON data from a given file.
const readFromFile = (filePath) => {
  try {
    const data = readFileSync(filePath, 'utf-8')

    if (!data) {
      console.log("File is empty");
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON file:', error);
    return null;
  }
}

// Uses writeFileSync to write JSON data to a given file.
const writeToFile = (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

module.exports = {
  readFromFile,
  writeToFile
};