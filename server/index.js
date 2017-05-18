"use strict";

const PORT          = 8080;
const MONGODB_URI   = "mongodb://localhost:27017/tweeter";
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const MongoClient   = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// The `data-helpers` module provides an interface to the database of tweets.
const DataHelpers = require("./lib/data-helpers.js")(MongoClient, MONGODB_URI);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
