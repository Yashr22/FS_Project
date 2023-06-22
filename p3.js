const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

// Define the Animal schema
const animalSchema = new mongoose.Schema({
  name: String,
  lifespan: Number,
  age: Number
});

// Define the Animal model
const Animal = mongoose.model('Animal', animalSchema);

class Zoo {
  constructor() {
    this.animals = [];
  }

  addAnimal(animal) {
    this.animals.push(animal);
  }

  async getAnimalsAliveAfterOneYear() {
    const animalsAlive = [];

    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];
      animal.age++;

      if (animal.age < animal.lifespan) {
        animalsAlive.push(animal);
      }
    }

    return animalsAlive;
  }
}

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb+srv://yashwantrbsc22:yashwantr22@yashwant.pi7dg6q.mongodb.net/student?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const zoo = createZooWithAnimals();

    // Insert animals into the collection
    await Animal.insertMany(zoo.animals);
    console.log('Animals inserted into MongoDB');

    // Find animals in the collection
    const findResult = await Animal.find();
    console.log('Animals found in MongoDB:', findResult);

    // Update an animal's lifespan
    const animalToUpdate = zoo.animals[0];
    const updatedLifespan = parseInt(prompt(`Enter the updated lifespan for ${animalToUpdate.name}:`), 10);
    await Animal.updateOne({ _id: animalToUpdate._id }, { lifespan: updatedLifespan });
    console.log('Animal updated in MongoDB');

    // Delete an animal from the collection
    const animalToDelete = zoo.animals[1];
    await Animal.deleteOne({ _id: animalToDelete._id });
    console.log('Animal deleted from MongoDB');

    // Retrieve the animals after one year from the collection
    const animalsAliveAfterOneYear = await zoo.getAnimalsAliveAfterOneYear();
    console.log('Animals alive after one year:', animalsAliveAfterOneYear);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

function createZooWithAnimals() {
  const zoo = new Zoo();
  const numAnimals = parseInt(prompt('Enter the number of animals:'), 10);

  for (let i = 0; i < numAnimals; i++) {
    const name = prompt(`Enter the name of Animal ${i + 1}:`);
    const lifespan = parseInt(prompt(`Enter the lifespan of Animal ${i + 1}:`), 10);
    const animal = new Animal({ name, lifespan, age: 0 });
    zoo.addAnimal(animal);
  }

  return zoo;
}

// Call the connectToMongoDB function to start the program
connectToMongoDB();