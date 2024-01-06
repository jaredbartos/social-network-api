const { User, Thought } = require('../models');

// Controller functions to use for user routes
// Get all users
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
    // Get single user from request parameter and populate references
    const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      res.status(404).json({ message: 'No user exits with that ID!' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Create a user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a user and any associated thoughts
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      res.status(404).json({ message: 'No user exists with that ID!' });
      return;
    }

    await Thought.deleteMany({ _id: { $in: user.thoughts } })

    res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Add friend to user's friend list
const addFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user exists with that ID!' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete friend from user's friend list
const deleteFriend = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user exists with that ID!' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
};