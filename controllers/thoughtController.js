const { User, Thought } = require('../models');

// Controller functions to use for thought routes
// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  } 
};

// Get single thought by ID
const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      res.status(404).json({ message: 'No thought exists with that ID!' });
      return;
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a thought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      }
    );

    // Update user with added thought
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } }
    );

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought exists with that ID!' });
      return;
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a thought
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
      res.status(404).json({ message: 'No thought exists with that ID!' });
      return;
    }

    // Remove thought from that user's thoughts array
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );

    res.json({ message: 'The thought has been deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a reaction to a thought
const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { reactions: req.body },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought exists with that ID!' });
      return;
    };

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a reaction from a thought
const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought exists with that ID!' });
      return;
    };

    res.json({ message: 'The reaction has been deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
};