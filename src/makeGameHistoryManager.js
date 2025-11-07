const Game = require("./Game");
const path = require('node:path');
const { readFromFile, writeToFile } = require('./utils/fileIO');
const PATH_TO_GAME_HISTORY = path.join(__dirname, './data/gameHistory.json');

// Factory Function that manages a gameHistory and input/output with the gameHistory.json file.
const makeGameHistoryManager = () => {
  // Check to see if there is a saved history in the gameHistory.json file
  const savedHistory = readFromFile(PATH_TO_GAME_HISTORY);

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
      writeToFile(PATH_TO_GAME_HISTORY, gameHistory);
      console.log("Game saved. Thanks for playing!");
    },
  }
}

module.exports = makeGameHistoryManager;