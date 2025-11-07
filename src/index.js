const { Game, GameHistory } = require('./Game');
const prompt = require('prompt-sync')({ sigint: true });
const makeFileIO = require('./utils/makeFileIO');
const path = require('node:path');

const MENU_OPTIONS = {
  HOW_TO_PLAY: '1',
  START_GAME: '2',
  VIEW_STATS: '3',
  VIEW_HISTORY: '4',
  EXIT: '5'
};

/**
 * Main function that runs the Dragon Slayer game
 */
const main = () => {
  console.clear();

  // Load Game History
  const pathToGameHistory = path.join(__dirname, './data/gameHistory.json');
  const gameHistoryIO = makeFileIO(pathToGameHistory);
  const loadedGameHistory = gameHistoryIO.read();
  GameHistory.setGameHistory(loadedGameHistory || []);

  // Greet Player
  const playerName = prompt("Enter your name: ");
  console.log(`Welcome to Dragon Slayer ${playerName}! Can you defeat the dragon?`);

  // Menu Loop
  while (true) {
    console.log("\nWhat would you like to do?");
    console.log(`${MENU_OPTIONS.HOW_TO_PLAY}. How to Play`)
    console.log(`${MENU_OPTIONS.START_GAME}. Start new game`);
    console.log(`${MENU_OPTIONS.VIEW_STATS}. View character stats`);
    console.log(`${MENU_OPTIONS.VIEW_HISTORY}. View game history`);
    console.log(`${MENU_OPTIONS.EXIT}. Save and Exit`);
    console.log();

    const choice = prompt("Enter your choice (1-5): ");

    switch (choice) {
      case MENU_OPTIONS.HOW_TO_PLAY:
        Game.printHowToPlay();
        break;
      case MENU_OPTIONS.START_GAME:
        const game = new Game(playerName);
        game.runGame();
        break;
      case MENU_OPTIONS.VIEW_STATS:
        Game.printCharacterStats();
        break;
      case MENU_OPTIONS.VIEW_HISTORY:
        GameHistory.printGameHistory();
        break;
      case MENU_OPTIONS.EXIT:
        gameHistoryIO.write(GameHistory.getGameHistory());
        console.log("Game saved. Thanks for playing!")
        return;
      default:
        console.log("Invalid choice. Please try again.");
        break;
    }

    prompt("\nPress Enter to continue...");
    console.clear();
  }
}

main();
