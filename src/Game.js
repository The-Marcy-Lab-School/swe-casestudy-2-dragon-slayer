const { Goblin, Orc, Dragon } = require('./characters/Enemies');
const { Mage, Warrior, Archer } = require('./characters/Heroes');
const Character = require('./characters/Character');

const prompt = require('prompt-sync')({ sigint: true });

/** 
 * Game class that manages the Dragon Slayer game state and gameplay

 * - printCharacterStats: Public method to print character stats for all hero and enemy classes
 * - printHowToPlay: Public method to print the instructions for how to play the game
 * 
 * Instance Properties:
 * - player: The player's character
 * - enemy: The enemy's character
 * - playerName: The player's name
 * - level: The current level
 * - achievedVictory: Whether the player has achieved victory
 * - enemies: The array of enemies
 * - gameHistoryIO: The input/output object for the game history
 * 
 * Instance Methods:
 * - runGame: Public method to run the game
 * - getCharacterSelection: Public method to get the player's character selection
 * - setLevel: Public method to set the current level
 * - displayBattleStatus: Public method to display the battle status
 * - getPlayerAndEnemyActions: Public method to get the player's and enemy's actions
 * - resolveActions: Public method to resolve the actions
*/
class Game {
  constructor(playerName) {
    this.player = null;
    this.enemy = null;
    this.playerName = playerName;
    this.level = 1;
    this.achievedVictory = false;
    this.enemies = [new Goblin(), new Orc(), new Dragon()];

    GameHistory.addGame(this);
  }

  runGame() {
    this.getCharacterSelection();

    for (let level = 1; level <= this.enemies.length; level++) {
      this.setLevel(level);

      // Battle until you or the enemy dies
      while (this.player.health > 0 && this.enemy.health > 0) {
        // Announce the player and enemy health
        this.displayBattleStatus();
        this.getPlayerAndEnemyActions();
        this.resolveActions();
        console.log('--------------------------------');
      }

      if (this.player.health <= 0) {
        console.log(`You have been defeated by ${this.enemy.name}, the ${this.enemy.type}! Better luck next time!`);
        return;
      }

      console.log(`🎉 ${this.enemy.name}, the ${this.enemy.type} has been defeated!`);
      console.log(`\nPress Enter to continue...`);
      prompt();
    }

    this.achievedVictory = true;
    console.log(`🎉 You have defeated all the enemies! You are the champion!`);
  }

  getCharacterSelection() {
    console.clear();
    while (this.player === null) {
      console.log("\nGet ready to battle! Who will you choose to slay the dragon?");
      console.log("1. Mage");
      console.log("2. Warrior");
      console.log("3. Archer");

      const heroType = prompt("Choose your hero (enter 1, 2, or 3): ").trim();

      if (heroType === "1") {
        this.player = new Mage(this.playerName);
      } else if (heroType === "2") {
        this.player = new Warrior(this.playerName);
      } else if (heroType === "3") {
        this.player = new Archer(this.playerName);
      } else {
        console.log("Invalid hero type. Please choose again.");
        continue;
      }
    }

    console.log(`${this.player.name}, the ${this.player.type}, your journey begins!`);
  }

  setLevel(level) {
    this.level = level;
    this.enemy = this.enemies[this.level - 1];
    this.player.restoreHealth();

    // Announce the level and enemy
    console.clear();
    console.log(`\nLevel ${this.level}`);
    console.log(`You are fighting ${this.enemy.name}, the ${this.enemy.type}\n`);
  }

  displayBattleStatus() {
    // Announce the player and enemy health
    this.player.printStatus();
    this.enemy.printStatus();
  }

  getPlayerAndEnemyActions() {
    // Set the enemy action randomly and announce it
    this.enemy.setAction(Character.getRandomAction());
    console.log(`${this.enemy.name} chose to ${this.enemy.action}`);

    // Get the player's action and validate the action
    this.player.resetAction();
    while (!this.player.action) {
      const action = prompt("Choose your action (attack/defend/buff): ").trim().toLowerCase();
      this.player.setAction(action);
    }
    console.log();
  }

  resolveActions() {
    // Resolve player turn
    if (this.player.action === "attack") this.player.attack(this.enemy);
    else if (this.player.action === "defend") this.player.defend(this.enemy);
    else if (this.player.action === "buff") this.player.buff();

    // Resolve enemy turn (only if enemy is alive)
    if (this.enemy.health > 0) {
      if (this.enemy.action === "defend") this.enemy.defend(this.player);
      else if (this.enemy.action === "attack") this.enemy.attack(this.player);
      else if (this.enemy.action === "buff") this.enemy.buff();
    }
  }

  // How does this method demonstrate polymorphism?
  static printCharacterStats() {
    const heroes = [new Mage(), new Warrior(), new Archer()];
    const enemies = [new Goblin(), new Orc(), new Dragon()];

    console.clear();
    console.log("Hero Stats: ");
    heroes.forEach(character => character.printDescription());

    console.log("\nEnemy Stats: ");
    enemies.forEach(character => character.printDescription());
  }

  static printHowToPlay() {
    const instructions = `How to Play:
You are on a quest to slay the dragon, but a few enemies stand in your way.
Choose between Mage, Warrior, or Archer to start your journey.
Each hero has unique attack, defense, and buff (power up) abilities.

Attack: Deals damage to the enemy.
Defend: Reduces damage taken from the enemy.
Buff: Power up your attack, defense, or health.

Attacking damage is calculated as follows:
• If the opponent is defending, the damage dealt is equal to the attacker's attack strength minus double the defender's defense strength. If all damage is blocked, the defender will counter attack for half of their attack strength.
• If the opponent is attacking, the damage dealt is equal to the attacker's attack strength minus the defender's defense strength.
• If the opponent is buffing, the damage dealt is equal to the attacker's attack strength multiplied by 2. They take a critical hit!

Tips:
• Enemies are strong, but they choose their actions randomly and state their actions before you make your choice. So, choose your action wisely to defeat them!
• Buffing will increase your attack, defense, or health. Be careful — you are at your most vulnerable when you buff.
• Buffs are maintained between battles. Health is restored between battles.`;
    console.log(instructions);
  }
}

/**
 * GameHistory class that manages the game history
 * 
 * Static Properties:
 * - #gameHistory: Private array storing the history of all games played
 * 
 * Static Methods:
 * - getGameHistory: Public method to get a deep copy of the game history array
 * - setGameHistory: Public method to set the game history array
 * - printGameHistory: Public method to print the game history to console
 * - addGame: Public method to add a new game to the game history
 */
class GameHistory {
  static #gameHistory = [];

  static getGameHistory() {
    return structuredClone(GameHistory.#gameHistory);
  }

  static setGameHistory(newGameHistory) {
    if (!newGameHistory || !(newGameHistory instanceof Array)) {
      console.log("Invalid game history. Please provide an array.");
      return;
    }
    GameHistory.#gameHistory = newGameHistory;
  }

  static printGameHistory() {
    console.clear();

    const gameHistory = GameHistory.#gameHistory;

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
  }

  static addGame(gameInstance) {
    GameHistory.#gameHistory.push(gameInstance);
  }
}

module.exports = { Game, GameHistory };