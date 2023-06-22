const prompt=require('prompt-sync')();
class Animal {
    constructor(name, lifespan) {
      this.name = name;
      this.lifespan = lifespan;
      this.age = 0;
    }
  
    increaseAge() {
      this.age++;
    }
  
    isAlive() {
      return this.age < this.lifespan;
    }
  }
  
  class Zoo {
    constructor() {
      this.animals = [];
    }
  
    addAnimal(animal) {
      this.animals.push(animal);
    }
  
    getAnimalsAliveAfterOneYear() {
      const animalsAlive = [];
  
      for (let i = 0; i < this.animals.length; i++) {
        const animal = this.animals[i];
        animal.increaseAge();
  
        if (animal.isAlive()) {
          animalsAlive.push(animal);
        }
      }
  
      return animalsAlive;
    }
  }
  
  function createZooWithAnimals() {
    const zoo = new Zoo();
    const numAnimals = parseInt(prompt('Enter the number of animals:'), 10);
  
    for (let i = 0; i < numAnimals; i++) {
      const name = prompt(`Enter the name of Animal ${i + 1}:`);
      const lifespan = parseInt(prompt(`Enter the lifespan of Animal ${i + 1}:`), 10);
      const animal = new Animal(name, lifespan);
      zoo.addAnimal(animal);
    }
  
    return zoo;
  }
  
  function findAnimalsAliveAfterOneYear(zoo) {
    return zoo.getAnimalsAliveAfterOneYear();
  }
  
  function displayAnimalsAlive(animals) {
    console.log('Animals alive after one year:');
    for (let i = 0; i < animals.length; i++) {
      console.log(animals[i].name);
    }
  }
  
  function main() {
    const zoo = createZooWithAnimals();
    const animalsAliveAfterOneYear = findAnimalsAliveAfterOneYear(zoo);
    displayAnimalsAlive(animalsAliveAfterOneYear);
  }
  
  // Call the main function to start the program
  main();
  