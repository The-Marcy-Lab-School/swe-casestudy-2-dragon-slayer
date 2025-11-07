const Character = require('./Character');

class Mage extends Character {
  static attackBuff = 7;
  static healthBuff = 7;

  constructor(name) {
    super(name, "Mage", 15, 6, 40);
  }

  buff() {
    const attackIncrease = Mage.attackBuff;
    const healthIncrease = Mage.healthBuff;

    this.attackStrength += attackIncrease;
    this.health += healthIncrease;
    console.log(`${this.name} channels arcane power! Attack increased to ${this.attackStrength} and Health increased to ${this.health}`);

    return { attackIncrease, healthIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Mage.attackBuff} Attack, +${Mage.healthBuff} Health"`);
  }
}

class Warrior extends Character {
  static healthBuff = 4;
  static attackBuff = 1;
  static defenseBuff = 1;

  constructor(name) {
    super(name, "Warrior", 4, 10, 55);
  }

  buff() {
    const healthIncrease = Warrior.healthBuff;
    const attackIncrease = Warrior.attackBuff;
    const defenseIncrease = Warrior.defenseBuff;

    this.health += healthIncrease;
    this.attackStrength += attackIncrease;
    this.defenseStrength += defenseIncrease;
    console.log(`${this.name} roars in fury! Health increased to ${this.health}, Attack increased to ${this.attackStrength} and Defense increased to ${this.defenseStrength}`);

    return { healthIncrease, attackIncrease, defenseIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Warrior.healthBuff} Health, +${Warrior.attackBuff} Attack, +${Warrior.defenseBuff} Defense"`);
  }
}

class Archer extends Character {
  static attackBuff = 4;
  static defenseBuff = 4;

  constructor(name) {
    super(name, "Archer", 12, 8, 48);
  }

  buff() {
    const attackIncrease = Archer.attackBuff;
    const defenseIncrease = Archer.defenseBuff;

    this.attackStrength += attackIncrease;
    this.defenseStrength += defenseIncrease;
    console.log(`${this.name} sharpens awareness! Attack increased to ${this.attackStrength} and Defense increased to ${this.defenseStrength}`);

    return { attackIncrease, defenseIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Archer.attackBuff} Attack, +${Archer.defenseBuff} Defense"`);
  }
}

module.exports = {
  Mage,
  Archer,
  Warrior
};