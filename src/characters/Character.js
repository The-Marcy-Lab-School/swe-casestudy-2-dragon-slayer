const CRITICAL_HIT_MULTIPLIER = 2;
const BLOCK_DAMAGE_MULTIPLIER = 2;
const COUNTER_ATTACK_MULTIPLIER = 0.5;

/** 
 * Character class that represents a character in the game
 * 
 * Static Properties:
 * - validActions: Array of valid actions
 * 
 * Instance Properties:
 * - name: The name of the character
 * - type: The type of the character
 * - attackStrength: The attack strength of the character
 * - defenseStrength: The defense strength of the character
 * - maxHealth: The maximum health of the character
 * - health: The current health of the character
 * - action: The current action of the character
 * 
 * Instance Methods:
 * - restoreHealth: Method to restore the health of the character
 * - resetAction: Method to reset the action of the character
 * - setAction: Method to set the action of the character
 * - attack: Method to attack an opponent
 * - defend: Method to defend against an opponent
 * - buff: Method to buff the character
 * - printStatus: Method to print the status of the character
 * 
 * Static Methods:
 * - isValidAction: Static method to check if an action is valid
 * - getRandomAction: Static method to get a random action
 * - printDescription: Static method to print the description of a character
 */
class Character {
  static validActions = ["attack", "defend", "buff"];

  constructor(name, type, attackStrength, defenseStrength, health) {
    this.name = name;
    this.type = type;
    this.attackStrength = attackStrength;
    this.defenseStrength = defenseStrength;
    this.maxHealth = health;
    this.health = health;
    this.action = null; // "attack" | "defend" | "buff"
  }

  restoreHealth() {
    this.health = this.maxHealth;
  }

  resetAction() {
    this.action = null;
  }

  setAction(action) {
    if (Character.isValidAction(action)) {
      this.action = action;
    } else {
      console.log("Invalid action. Please choose again.");
    }
  }

  attack(opponent) {
    let damageDealt = Character.calculateDamage(this, opponent);

    opponent.health -= damageDealt;
    console.log(`${this.name} attacks ${opponent.name} for ${damageDealt} damage!`);

    return { damageDealt };
  }

  defend(opponent) {
    let prevented = 0;
    let counterAttack = 0;

    if (opponent.action === "attack") {
      const damageDealt = Character.calculateDamage(opponent, this);

      // If all damage is blocked, the opponent will counter attack for half of their attack strength.
      if (damageDealt === 0) {
        counterAttack = Math.floor(this.attackStrength * COUNTER_ATTACK_MULTIPLIER);
        opponent.health -= counterAttack;
        console.log(`${this.name} blocked completely and counterattacked ${opponent.name} for ${counterAttack} damage!`);
      } else {
        prevented = opponent.attackStrength - damageDealt;
        console.log(`${this.name} blocked ${prevented} damage!`);
      }
    }
    return { prevented, counterAttack };
  }

  buff() {
    // placeholder – each subclass overrides this
    console.log(`${this.name} tries to buff, but nothing happens.`);
  }

  printStatus() {
    const message = `${this.name}, the ${this.type}\nHP: ${this.health}, ATK: ${this.attackStrength}, DEF: ${this.defenseStrength}`;
    console.log(message);
    console.log();
    return { message }
  }

  printDescription() {
    console.log(`${this.type}`);
    console.log(`- Health: ${this.health}`);
    console.log(`- Attack Strength: ${this.attackStrength}`);
    console.log(`- Defense Strength: ${this.defenseStrength}`);
  }

  static isValidAction(action) {
    return Character.validActions.includes(action);
  }

  static getRandomAction() {
    return Character.validActions[Math.floor(Math.random() * Character.validActions.length)];
  }

  static calculateDamage(attacker, defender) {
    let damageDealt;

    switch (defender.action) {
      case "buff":
        damageDealt = attacker.attackStrength * CRITICAL_HIT_MULTIPLIER;
        break;
      case "attack":
        damageDealt = Math.max(0, attacker.attackStrength - defender.defenseStrength);
        break;
      case "defend":
        damageDealt = Math.max(0, attacker.attackStrength - defender.defenseStrength * BLOCK_DAMAGE_MULTIPLIER);
        break;
    }

    return damageDealt;
  }
}

module.exports = Character;