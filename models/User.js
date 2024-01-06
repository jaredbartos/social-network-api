const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Validate that entry has valid email address
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Email address is not in valid format',
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // Include virtuals in JSON responses
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Get number of friends on queries
userSchema.virtual('friendCount')
  .get(function() {
    return this.friends.length;
  });

// Initialize User model
const User = model('User', userSchema);

module.exports = User;