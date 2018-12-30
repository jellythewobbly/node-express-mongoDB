const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
  mongoose
    .connect(
      'mongodb://localhost/node_vidly',
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log('Connected to MongoDB...');
      winston.info('App started, connected to MongoDB', {
        timestamp: new Date().toLocaleString(),
      });
    })
    .catch(err => {
      console.error('Could not connect to MongoDB...', err.message);
      winston.info('Could not connect to MongoDB', {
        error: err.message,
        timestamp: new Date().toLocaleString(),
      });
    });
};
