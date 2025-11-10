const Game = require('./Game');
const makeGameHistoryManager = require('./makeGameHistoryManager')
const prompt = require('prompt-sync')({ sigint: true });

/**
 * Main function that runs the Dragon Slayer game. 
 * It creates a gameHistoryManager to track games played
 * and initializes a new Game instance each time the
 * player starts a new game. The user is able to choose
 * from a menu to play a game, view the rules, look
 * at the characters, view game history, or save and exit.
 */
const main = () => {
  // Use the factory to make a new gameHistoryManager
  const gameHistoryManager = makeGameHistoryManager();

  console.clear();

  // Greet Player
  const playerName = prompt("Enter your name: ");
  console.log(`Welcome to Dragon Slayer ${playerName}! Can you defeat the dragon?`);

  // Menu Loop
  while (true) {
    console.log("\nWhat would you like to do?");
    console.log(`1. How to Play`)
    console.log(`2. Start new game`);
    console.log(`3. View character stats`);
    console.log(`4. View game history`);
    console.log(`5. Save and Exit`);
    console.log();

    const choice = prompt("Enter your choice (1-5): ");

    switch (choice) {
      case "1":
        Game.printHowToPlay();
        break;
      case "2":
        const game = new Game(playerName);
        game.runGame();
        // add the game to the gameHistory once its over
        gameHistoryManager.addGame(game);
        break;
      case "3":
        Game.printCharacterStats();
        break;
      case "4":
        gameHistoryManager.printGameHistory();
        break;
      case "5":
        gameHistoryManager.saveGameHistory();
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
