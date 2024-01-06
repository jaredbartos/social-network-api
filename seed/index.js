const { User, Thought } = require('../models');
const db = require('../config/connection');
const userSeedData = require('./userSeedData.json')

const seedUsers = async (data) => {
  const users = await User.find({});

  if (users.length) {
    await db.dropCollection('users');
  };

  const userResults = await User.create(data);
  console.log(userResults);
};

db.once('open', async () => {
  await seedUsers(userSeedData);

  process.exit();
});