const { User, Thought } = require('../models');
const db = require('../config/connection');
const userSeedData = require('./userSeedData.json');
const thoughtSeedData = require('./thoughtSeedData.json');

const seedUsers = async (data) => {
  const users = await User.find({});

  if (users.length) {
    await db.dropCollection('users');
  }

  const userResults = await User.create(data);
  console.log(userResults);
};

const seedThoughts = async (data) => {
  const thoughts = await Thought.find({});

  if (thoughts.length) {
    await db.dropCollection('thoughts');
  }

  const thoughtResults = await Thought.create(data);
  console.log(thoughtResults);
};

const updateUsers = async (thought) => {
  const thoughtId = thought._id;
  const thoughtUsername = thought.username;

  const user = await User.findOneAndUpdate(
    { username: thoughtUsername },
    { $addToSet: { thoughts: thoughtId } },
    { new: true }
  )

  console.log(user);
};

const attributeThoughts = async () => {
  const thoughts = await Thought.find({});
  
  for (let i = 0; i < thoughts.length; i++) {
    await updateUsers(thoughts[i]);
  }
}

db.once('open', async () => {
  await seedUsers(userSeedData);

  await seedThoughts(thoughtSeedData);

  await attributeThoughts();

  process.exit();
});