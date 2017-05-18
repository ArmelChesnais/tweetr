"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db, url) {
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
          console.log(`Connected to mongodb: ${url}`);


          // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          db.collection("tweets").insert(newTweet);
          // callback(null, db.tweets.sort(sortNewestFirst));
          db.close();
        });
        // db.tweets.push(newTweet);
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


          // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          db.collection("tweets").find().sort({ 'created_at': -1}).toArray(callback);
          // callback(null, db.tweets.sort(sortNewestFirst));
          db.close();
        });
      });
    }
  }
}