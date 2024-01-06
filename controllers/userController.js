const { User, Thought } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');

    if (!user) {
      res.status(404).json({ message: 'No user exits with that ID!' })
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = { getAllUsers, getSingleUser };