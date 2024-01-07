const { User, Thought } = require('../models');
const db = require('../config/connection');
const userSeedData = require('./userSeedData.json');
const thoughtSeedData = require('./thoughtSeedData.json');

// Function to seed users
const seedUsers = async (data) => {
  const users = await User.find();

  if (users.length) {
    await db.dropCollection('users');
  }

  await User.create(data);
};

// Function to seed thoughts
const seedThoughts = async (data) => {
  const thoughts = await Thought.find();

  if (thoughts.length) {
    await db.dropCollection('thoughts');
  }

  await Thought.create(data);
};

// Function to update users with their thoughts
const updateUsers = async (thought) => {
  const thoughtId = thought._id;
  const thoughtUsername = thought.username;

  await User.findOneAndUpdate(
    { username: thoughtUsername },
    { $addToSet: { thoughts: thoughtId } },
    { new: true }
  );
};

// Function to take each thought and attribute it to users
const attributeThoughts = async () => {
  const thoughts = await Thought.find();
  
  for (let i = 0; i < thoughts.length; i++) {
    await updateUsers(thoughts[i]);
  }
}

// Seed collections
db.once('open', async () => {
  await seedUsers(userSeedData);

  await seedThoughts(thoughtSeedData);

  await attributeThoughts();

  console.log('Database seeded!');

  process.exit();
});