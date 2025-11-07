const Character = require('./Character');

class Goblin extends Character {
  static attackBuff = 4;

  constructor() {
    super("Goober", "Goblin", 12, 6, 60);
  }

  buff() {
    const attackIncrease = Goblin.attackBuff;

    this.attackStrength += attackIncrease;
    console.log(`${this.name} gets enraged! Attack is now ${this.attackStrength}`);

    return { attackIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Goblin.attackBuff} Attack"`);
  }
}

class Orc extends Character {
  static defenseBuff = 6;
  static attackBuff = 6;

  constructor() {
    super("Orcus", "Orc", 18, 14, 80);
  }

  buff() {
    const defenseIncrease = Orc.defenseBuff;
    const attackIncrease = Orc.attackBuff;

    this.defenseStrength += defenseIncrease;
    this.attackStrength += attackIncrease;
    console.log(`${this.name} braces itself! Defense is now ${this.defenseStrength} and Attack is now ${this.attackStrength}`);

    return { defenseIncrease, attackIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Orc.defenseBuff} Defense, +${Orc.attackBuff} Attack"`);
  }
}

class Dragon extends Character {
  static healthBuff = 10;
  static attackBuff = 10;
  static defenseBuff = 10;

  constructor() {
    super("Pyro", "Dragon", 24, 18, 100);
  }

  buff() {
    const healthIncrease = Dragon.healthBuff;
    const attackIncrease = Dragon.attackBuff;
    const defenseIncrease = Dragon.defenseBuff;

    this.health += healthIncrease;
    this.attackStrength += attackIncrease;
    this.defenseStrength += defenseIncrease;
    console.log(`${this.name} regenerates scales! Health is now ${this.health}, Attack is now ${this.attackStrength} and Defense is now ${this.defenseStrength}`);

    return { healthIncrease, attackIncrease, defenseIncrease };
  }

  printDescription() {
    super.printDescription();
    console.log(`- Buff: "+${Dragon.healthBuff} Health, +${Dragon.attackBuff} Attack, +${Dragon.defenseBuff} Defense"`);
  }
}


module.exports = {
  Goblin,
  Orc,
  Dragon
};