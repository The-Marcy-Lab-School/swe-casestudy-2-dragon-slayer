// Import Game so I can verify that new games added to the gameHistory are instances of Game.
const Game = require("./Game");

// Import these to help with file input/output.
const path = require('node:path');
const { readFromJSONFile, writeToJSONFile } = require('./utils/fileIO');
const PATH_TO_GAME_HISTORY = path.join(__dirname, './data/gameHistory.json');

/* 
makeGameHistoryManagerFactory is a Factory Function
It returns an object that manages a gameHistory array
It has the following methods:
- addGame(gameInstance) - adds a game instance to the gameHistory array
- printGameHistory() - prints the gameHistory array to the console
- saveGameHistory() - saves the gameHistory array to the gameHistory.json file

It uses a closure to keep the gameHistory array private.
*/
const makeGameHistoryManager = () => {
  // Check to see if there is a saved history in the gameHistory.json file
  const savedHistory = readFromJSONFile(PATH_TO_GAME_HISTORY);

  // set gameHistory to savedHistory (if it exists) or [] as a backup
  const gameHistory = savedHistory || [];

  return {
    addGame(gameInstance) {
      if (!gameInstance instanceof Game) {
        console.log("provided game must be an instance of Game");
        return;
      }
      gameHistory.push(gameInstance);
    },
    printGameHistory() {
      console.clear();

      if (!gameHistory.length) {
        console.log("No games have been played yet.");
        return;
      }

      console.log("Game History:");
      gameHistory.forEach(game => {
        const { playerName, achievedVictory, level, player, enemy } = game;
        if (achievedVictory) {
          console.log(`• ${playerName}, the ${player.type} slayed the dragon with ${player.health} health remaining.`);
        } else {
          console.log(`• ${playerName}, the ${player.type} was defeated by ${enemy.name}, the ${enemy.type} on level ${level}.`);
        }
      });
    },
    saveGameHistory() {
      writeToJSONFile(PATH_TO_GAME_HISTORY, gameHistory);
      console.log("Game saved. Thanks for playing!");
    },
  }
}

module.exports = makeGameHistoryManager;