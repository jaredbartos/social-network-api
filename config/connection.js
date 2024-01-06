const { connect, connection } = require('mongoose');

// Connect to MongoDB through Mongoose
connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;