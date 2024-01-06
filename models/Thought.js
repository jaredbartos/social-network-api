const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// Import helper function for formatting dates
const { formatDate } = require('../utils/dates');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    // Include getters and virtuals in JSON response
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Get number of reactions on queries
thoughtSchema.virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;