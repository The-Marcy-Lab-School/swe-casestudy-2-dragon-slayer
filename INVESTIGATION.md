# Application Investigation

By answering these questions, you will be required to think critically about how the application is designed and understand WHY it is designed in this way. Your aim should be to:
* learn as much as you can from this application so that you can build an application of your own that leverages these same skills
* communicate clearly about the concepts you are using and the decisions you make for how you implement them.

**Table of Contents**
- [Investigation Questions](#investigation-questions)
  - [Encapsulation with Closures \& Factory Functions](#encapsulation-with-closures--factory-functions)
  - [Encapsulation with Classes](#encapsulation-with-classes)
  - [Inheritance](#inheritance)
  - [Polymorphism](#polymorphism)

## Investigation Questions

Mod 2 Topics:
* OOP Pillars
  * Encapsulation
  * Abstraction
  * Inheritance
  * Polymorphism
* Closures
* `class` constructor
* `static` vs instance methods/properties
* private (`#`) vs public methods/properties
* `extends` and `instanceof`
* `super`
* UML Diagram / Relationship Mapping

### Encapsulation with Closures & Factory Functions

A **closure** in JavaScript is a feature where an inner function has access to variables defined in its outer (enclosing) function, even after that outer function has finished executing. This allows the inner function to "remember" and interact with the environment in which it was created, letting you preserve private state between function calls.

A **factory function** is a function that returns a new object each time it's called, often using closure to encapsulate private variables and methods that can't be accessed from outside the function. When a factory function defines internal variables and returns an object with methods that reference those variables, those methods form closures—giving the created objects their own encapsulated, persistent state.

**Investigation Questions:** 

Note: "IO" is short for "input / output" and is a common acronym used to describe functionality related to reading data from or writing data to external sources such as files or the command line. In this case, we use it to read from and write to the `gameHistory.json` file.

Look into the `makeGameHistoryManager.js` file and examine how it's used in `index.js`:

1. In `makeGameHistoryManager.js`, the `gameHistory` variable is defined inside the factory function (line 12). Trace through the code: where is `gameHistory` used inside the returned object? Even though `makeGameHistoryManager` finishes executing and returns, how can the `addGame()`, `printGameHistory()`, and `saveGameHistory()` methods still access the `gameHistory` variable? Explain how closure makes this possible.

2. Look at how `makeGameHistoryManager` is used in `index.js` (line 10). The function is called, and the returned object is stored in `gameHistoryManager`. What would happen if you called `makeGameHistoryManager` multiple times? Would each returned object have its own separate `gameHistory` array? Why or why not? Come up with an imagined example with two different game history manager objects to illustrate your answer.

3. The `gameHistory` variable is not directly accessible from outside the returned object. Try to explain: if you created a `gameHistoryManager` object using `makeGameHistoryManager`, could you directly access or modify the `gameHistory` array from outside? Why is this beneficial? How does this demonstrate encapsulation?

4. Compare the factory function pattern in `makeGameHistoryManager.js` to how you might implement this with a class. If you were to convert `makeGameHistoryManager` to a class, what would the constructor look like? What would be the equivalent of the `gameHistory` variable? Why might a factory function be more appropriate here than a class? Consider: does this functionality need to maintain state between method calls?

5. Look at the `addGame()`, `printGameHistory()`, and `saveGameHistory()` methods in the returned object. All of these methods reference the `gameHistory` variable that was captured in the closure. If you were to modify the code to add a new method called `getGameHistory()` that returns the `gameHistory` array, would this break encapsulation? Why or why not?

### Encapsulation with Classes

Encapsulation with classes is an object-oriented programming concept where data (properties) and behavior (methods) are bundled together within a class. It restricts direct access to some of an object's components, typically by using private fields (using `#` in JavaScript) and providing public methods to interact with that data. This ensures that the internal state of an object can only be changed in controlled ways. Encapsulation provides improved code safety as well as easier maintenance and refactoring.

**Investigation Questions:** 

Examine the `Game.js` file:

1. Compare the static methods and properties in the `Game` class to the instance methods and properties. Look at methods like `printCharacterStats()` (static, line 140) versus `runGame()` (instance, line 40). What's the difference between calling `Game.printCharacterStats()` and `game.runGame()`? Why are some methods static (belonging to the class) while others are instance methods (belonging to each game object)? How does this relate to encapsulation—what data does each type of method need to access?

2. Look at the `printCharacterStats()` static method (lines 140-150). Why is this method static rather than an instance method? What would happen if you tried to call `game.printCharacterStats()` on a `Game` instance? Why doesn't this method need access to any instance properties?

3. Examine the instance properties in the `Game` constructor (lines 31-37). Properties like `player`, `enemy`, `playerName`, `level`, and `achievedVictory` are all public. If you wanted to make the `level` property private in the `Game` class, what would you need to change? How would you need to modify methods like `setLevel()` and `runGame()` that access `this.level`? Explain why making `level` private would improve encapsulation and prevent potential bugs (e.g., what if someone accidentally set `game.level = -5`?).

4. Look at the `Character` class in `characters/Character.js`. All the properties defined in the constructor (lines 63-70) are public. If you wanted to make a character's `health` property private in the `Character` class, what would you need to change? How would you need to modify the `restoreHealth()` method? What other methods in the `Character` class directly access `this.health`, and how would they need to change? Explain why making `health` private would improve encapsulation and prevent potential bugs (e.g., what if someone accidentally set `character.health = -100`?).

### Inheritance

Inheritance is an object-oriented programming (OOP) concept where a new class (the **subclass**) automatically acquires the properties and methods of another class (the **superclass**). This promotes code reuse, allows programmers to build upon existing functionality, and enables logical relationships between types. By using inheritance, programmers can write less repetitive code, make their code more modular and maintainable, and easily extend or specialize functionality in future subclasses.

**Investigation Questions:** 
Take a look at the `characters/` directory and look at the `Character.js` class. Then, look at the classes defined in `Heroes.js` and `Enemies.js`. 

1. Examine the constructor of the `Mage` class in `Heroes.js`. What does the `super()` call do, and what arguments are being passed to it? Compare this to the `Character` class constructor. Why is it necessary to call `super()` before any other code in the subclass constructor?

2. In the `Character.js` class, identify all the instance methods and properties that are defined. Now look at the `Warrior` class in `Heroes.js`. Which methods and properties from `Character` can a `Warrior` instance access? Give at least three examples of inherited methods that `Warrior` can use.

3. Examine the `printDescription()` method in the `Archer` class. It calls `super.printDescription()` before adding its own console.log statement. What would happen if you removed the `super.printDescription()` call? What would the output be? Explain why using `super` here is important for maintaining the base class functionality.

### Polymorphism

Polymorphism is an object-oriented programming concept where objects of different classes can be treated as if they are instances of the same superclass because they share a common interface (the same method names). In practice, it means that you can invoke the same method (for example, `.buff()` or `.printDescription()`) on different objects, and each object will respond in its own class-specific way.

**Benefits to programmers:**
- Makes code more flexible and extensible, because you can write general code that works with a wide range of object types.
- Reduces the amount of repetitive or duplicated code, since the same interface can be reused across subclasses.
- Enhances maintainability, since changes to functionality can be made in one place (the superclass or a specific subclass) without altering code that depends on the polymorphic interface.

**Investigation Questions:** 
Take a look at the `characters/` directory and examine the `Game.js` file.

1. Look at the `printCharacterStats()` method in `Game.js` (lines 140-150). This method creates arrays containing different character types (`Mage`, `Warrior`, `Archer`, `Goblin`, `Orc`, `Dragon`) and then calls `printDescription()` on each one. Explain how polymorphism makes this possible. What would happen if each character class didn't have a `printDescription()` method? What would happen if some classes had the method and others didn't?

2. Examine the `resolveActions()` method in `Game.js` (lines 125-137). Notice that it calls `this.player.buff()` and `this.enemy.buff()` without knowing the specific subclass type. Look at the `buff()` method implementations in `Mage`, `Warrior`, `Archer`, `Goblin`, `Orc`, and `Dragon`. How does polymorphism ensure that the correct `buff()` method is called for each character? What would the output be if you called `buff()` on a `Mage` versus a `Dragon`? How is this different from the base `Character.buff()` method?

3. In the `Character.js` class, the `buff()` method (lines 118-121) contains a placeholder implementation that just logs a message. Why do you think the base class has this placeholder method instead of leaving it undefined? How does this design choice relate to polymorphism? What would happen if you tried to call `buff()` on a `Character` instance directly (not a subclass)?

4. Look at the `displayBattleStatus()` method in `Game.js` (lines 105-109). It calls `printStatus()` on both `this.player` and `this.enemy`. However, `printStatus()` is not overridden in any of the subclasses—it's only defined in the `Character` class. Is this still an example of polymorphism? Why or why not? How does this differ from the polymorphic behavior you see with `buff()` or `printDescription()`?

5. Consider the `enemies` array in the `Game` constructor (line 37). It contains instances of `Goblin`, `Orc`, and `Dragon`. Later in the code, `this.enemy` is assigned from this array (line 96). Throughout the `Game` class, methods like `setAction()`, `attack()`, `defend()`, and `buff()` are called on `this.enemy` without checking its specific type. Explain how polymorphism allows this to work. If you wanted to add a new enemy type (e.g., `Troll`), what would you need to do to make it work seamlessly with the existing `Game` code? What would break if `Troll` didn't extend `Character`?
