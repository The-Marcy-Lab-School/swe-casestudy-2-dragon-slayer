const { readFileSync, writeFileSync } = require('node:fs');

/* 
 * makeFileIO is a factory function that creates a FileIO object (I/O = input and output)
 * A closure is created around the filePath variable
 */
const makeFileIO = (filePath) => {
  return {
    read: () => {
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
    },
    write: (data) => {
      try {
        writeFileSync(filePath, JSON.stringify(data));
      } catch (error) {
        console.error('Error writing to file:', error);
      }
    }
  }
}

module.exports = makeFileIO;