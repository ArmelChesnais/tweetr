"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db, url) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.connect(url, (err, db) => {
          if (err) {
            console.error(`Failed to connect: ${url}`);
            throw err;
          }
          // We have a connection to the "tweeter" db, starting here.
          db.collection("tweets").insert(newTweet);
          db.close();
        });
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        db.connect(url, (err, db) => {
          if (err) {
            console.error(`Failed to connect: ${url}`);
            throw err;
          }
          // We have a connection to the "tweeter" db, starting here.

          // pull the tweets collection from MongoDB, sort them in reverse chronological order,
          // and change to usable array, to apply to the callback.
          db.collection("tweets").find().sort({ 'created_at': -1}).toArray(callback);
          db.close();
        });
      });
    }

  }

}