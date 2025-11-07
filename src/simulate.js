const Game = require('./Game');
const { Mage, Warrior, Archer } = require('./models/Heroes');
const { Goblin, Orc, Dragon } = require('./models/Enemies');

function getRandomAction() {
  return Game.getRandomAction();
}

function choosePlayerAction(player, enemy, turnIndex, buffsApplied) {
  // Heuristic policy:
  // - Early buffing: buff for first 1-2 turns
  // - If enemy defends, prefer to buff
  // - If enemy attacks and we're low, defend
  // - Otherwise, attack

  const lowHealth = player.health <= Math.floor(player.maxHealth * 0.4);

  if (turnIndex <= 2 && buffsApplied < 2) return 'buff';
  if (enemy.action === 'defend') return 'buff';
  if (enemy.action === 'attack' && lowHealth) return 'defend';
  return 'attack';
}

function resolveTurn(player, enemy, turnIndex, buffsAppliedRef) {
  // Enemy picks action randomly
  enemy.setAction(getRandomAction());

  // Player chooses based on heuristic
  player.resetAction();
  const decision = choosePlayerAction(player, enemy, turnIndex, buffsAppliedRef.value);
  player.setAction(decision);
  if (decision === 'buff') buffsAppliedRef.value += 1;

  // Match the in-game resolution order
  if (enemy.action === 'defend') enemy.defend(player);

  if (player.action === 'attack') player.attack(enemy);
  else if (player.action === 'defend') player.defend(enemy);
  else if (player.action === 'buff') player.buff();

  if (enemy.health > 0) {
    if (enemy.action === 'attack') enemy.attack(player);
    else if (enemy.action === 'buff') enemy.buff();
  }
}

function simulateHero(HeroClass, runs = 1000) {
  // Silence logs for performance and clarity
  const originalLog = console.log;
  console.log = () => { };

  let wins = 0;
  const enemyFactories = [() => new Goblin(), () => new Orc(), () => new Dragon()];
  const enemyNames = ['Goblin', 'Orc', 'Dragon'];
  const attempts = [0, 0, 0];
  const victories = [0, 0, 0];

  for (let i = 0; i < runs; i++) {
    const player = new HeroClass('Sim');
    const enemies = enemyFactories.map(f => f());

    let defeatedAll = true;
    for (let level = 0; level < enemies.length; level++) {
      const enemy = enemies[level];
      attempts[level]++;
      player.restoreHealth();
      let turnIndex = 1;
      const buffsAppliedRef = { value: 0 };

      while (player.health > 0 && enemy.health > 0) {
        resolveTurn(player, enemy, turnIndex, buffsAppliedRef);
        turnIndex++;
      }

      if (enemy.health <= 0) {
        victories[level]++;
        continue;
      }

      // player died at this level
      defeatedAll = false;
      break;
    }

    if (defeatedAll) wins++;
  }

  // Restore logging
  console.log = originalLog;

  const perEnemy = enemyNames.map((name, idx) => {
    const att = attempts[idx] || 0;
    const vic = victories[idx] || 0;
    const rate = att === 0 ? 0 : vic / att;
    return { name, attempts: att, victories: vic, winRate: rate };
  });

  return { wins, runs, winRate: wins / runs, perEnemy };
}

function main() {
  const runs = Number(process.env.RUNS || 1000);
  const results = [
    ['Mage', Mage],
    ['Warrior', Warrior],
    ['Archer', Archer],
  ].map(([name, Hero]) => {
    const { wins, winRate, perEnemy } = simulateHero(Hero, runs);
    return { name, wins, runs, winRate, perEnemy };
  });

  results.forEach(r => {
    console.log(`${r.name}: ${r.wins}/${r.runs} overall (${(r.winRate * runs).toFixed(2)}%) with heuristic policy`);
    r.perEnemy.forEach(pe => {
      const pct = (pe.winRate * runs).toFixed(2);
      console.log(`  vs ${pe.name}: ${pe.victories}/${pe.attempts} (${pct}%)`);
    });
  });
}

if (require.main === module) {
  main();
}


