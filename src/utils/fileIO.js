const { readFileSync, writeFileSync } = require('node:fs');

/* 
  The try/catch block is something we'll learn more about in the future.
  It allows us to write code that would otherwise crash our program but 
  instead we "catch" the error, handle it, and continue the program.

  readFileSync attempts to read and return the contents of the given file.
  readFileSync returns the raw text content of that file as a string.
  We expect that content to be in JSON format so we use JSON.parse(data) 
  which attempts to convert the raw string into an object by "parsing" it.
  If successful, the data is turned into an object that we can use in our
  program. If not, an error is thrown which we "catch" and print.
  */

// Uses readFileSync to read JSON data from a given .json file.
// filePath must be an absolute filepath
const readFromJSONFile = (filePath) => {
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
// The given data needs to be "stringified" into JSON format
// before we can store it in the given file.
const writeToJSONFile = (filePath, data) => {
  try {
    writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

module.exports = {
  readFromJSONFile,
  writeToJSONFile
};