const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

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

async function connectToMongoDB() {
  const uri = 'mongodb+srv://yashwantrbsc22:yashwantr22@yashwant.pi7dg6q.mongodb.net/student?retryWrites=true&w=majority'; // MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB database
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('Zoo'); // Replace with your actual database name
    const collection = database.collection('Animal'); // Replace with your actual collection name

    const zoo = createZooWithAnimals();

    // Insert animals into the collection
    await collection.insertMany(zoo.animals);
    console.log('Animals inserted into MongoDB');

    // Find animals in the collection
    const findResult = await collection.find({}).toArray();
    console.log('Animals found in MongoDB:', findResult);

    // Update an animal's lifespan
    const animalToUpdate = zoo.animals[0];
    const updatedLifespan = parseInt(prompt(`Enter the updated lifespan for ${animalToUpdate.name}:`), 10);
    await collection.updateOne({ name: animalToUpdate.name }, { $set: { lifespan: updatedLifespan } });
    console.log('Animal updated in MongoDB');

    // Delete an animal from the collection
    const animalToDelete = zoo.animals[1];
    await collection.deleteOne({ name: animalToDelete.name });
    console.log('Animal deleted from MongoDB');

    // Retrieve the animals after one year from the collection
    const animalsAliveAfterOneYear = zoo.getAnimalsAliveAfterOneYear();
    console.log('Animals alive after one year:', animalsAliveAfterOneYear);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log('Disconnected from MongoDB');
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

// Call the connectToMongoDB function to start the program
connectToMongoDB();
