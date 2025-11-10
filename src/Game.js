const { Goblin, Orc, Dragon } = require('./characters/Enemies');
const { Mage, Warrior, Archer } = require('./characters/Heroes');
const Character = require('./characters/Character');

const prompt = require('prompt-sync')({ sigint: true });

/** 
 * Game class that manages the Dragon Slayer game state and gameplay
 * 
 * Every Game instance has the following public properties:
 * - player: The player's character
 * - enemy: The enemy's character
 * - playerName: The player's name
 * - level: The current level
 * - achievedVictory: Whether the player has achieved victory
 * - enemies: The array of enemies
 * - gameHistoryIO: The input/output object for the game history
 * 
 * Every Game instance has the following public methods:
 * - runGame(): run the game
 * - getCharacterSelection(): get the player's character selection (mage, archer, or warrior)
 * - setLevel(): set the current level and enemy
 * - displayBattleStatus(): display the battle status
 * - getPlayerAndEnemyActions(): get the player's and enemy's actions
 * - resolveActions(): resolve the actions
 * 
 * Game static methods
 * - printCharacterStats(): print character stats for all hero and enemy classes
 * - printHowToPlay(): print the instructions for how to play the game
*/
class Game {
  constructor(playerName) {
    this.player = null;
    this.enemy = null;
    this.playerName = playerName;
    this.level = 1;
    this.achievedVictory = false;
    this.enemies = [new Goblin(), new Orc(), new Dragon()];
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
    // Set the level and select the appropriate enemy
    this.level = level;
    this.enemy = this.enemies[this.level - 1];

    // Reset the player's health back to their max health
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

Choose a hero (Mage, Warrior, or Archer) and battle through three levels:
1. Level 1: Fight a Goblin (a fairly easy win)
2. Level 2: Fight an Orc (you should win most of the time)
3. Level 3: Fight the Dragon (a real challenge!)

Each turn, choose your action:
- Attack: Deal damage to the enemy.
- Defend: Double your defense and counterattack if all damage is blocked.
- Buff: Power up your character (increases attack, defense, or health). You will be vulnerable and take double damage if attacked.

Your enemies are powerful, but they choose their actions randomly and announce their choice before you act. If you want to win you must be strategic with your choices! 

Tip: Health is restored between levels, but buffs persist.`;
    console.log(instructions);
  }
}

module.exports = Game;