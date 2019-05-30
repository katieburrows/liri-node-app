require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
// var spotify = new Spotify(keys.spotify);
// var twitter = new Twitter(keys.twitter);

var commandArgs = process.argv[2];

var myTweets = function() {
    console.log(`tweet`);
}

var spotifyThisSong = function() {
    console.log(`song`);
}

var movieThis = function() {
    console.log(`movie`);
}

var doWhatItSays = function() {
    console.log(`do what it says`);
}

if (commandArgs === "my-tweets"){
    myTweets();
} 
else if (commandArgs === "spotify-this-song") {
    spotifyThisSong();
} 
else if (commandArgs === "movie-this"){
    movieThis();
} 
else if (commandArgs === "do-what-it-says"){
    doWhatItSays();
}
else {
    console.log(`That is not a valid entry. Please enter: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"`);
}