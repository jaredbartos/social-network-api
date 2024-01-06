const { Schema } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const { formatDate } = require('../utils/dates')

// Reaction schema to use in Thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate
    }
  },
  {
    toJSON: {
      getters: true
    },
    _id: false
  }
);

module.exports = reactionSchema;