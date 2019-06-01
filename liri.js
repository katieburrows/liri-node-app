require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var keys = require("./keys");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var commandArgs = process.argv[2];

// * This will show your last 20 tweets and when they were created at in your terminal/bash window.
var myTweets = function() {
    console.log(`tweet`);
}

// * This will show the following information about the song in your terminal/bash window
     
// * Artist(s)

// * The song's name

// * A preview link of the song from Spotify

// * The album that the song is from

// * If no song is provided then your program will default to "The Sign" by Ace of Base.
var spotifyThisSong = function() {
    console.log(`song`);
}

var movieThis = function(movie) {

    var movieTitle = process.argv.slice(3).join("+");

    if (movie){
        movieTitle = movie.split(" ").slice(1).join("+")
       console.log(movieTitle);
    }
    if (!movieTitle && !movie){
        movieTitle = "Mr. Nobody";
    }

    var queryUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

    console.log(queryUrl);

   
    axios.get(queryUrl).then(
        function(response) {
            var baseline = response.data;
            console.log("\n********** Movie Data **********\n");
            console.log(`     Movie title: ${baseline.Title}\n     Year released: ${baseline.Year}\n     IMDB rating: ${baseline.Ratings[0].Value}\n     Rotten Tomatoes rating: ${baseline.Ratings[1].Value}\n     Country where movie was produced: ${baseline.Country}\n     Language: ${baseline.Language}\n     Plot: ${baseline.Plot}\n     Actors: ${baseline.Actors}`); 
            console.log("\n********************************\n");
    })

}

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
// * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
// * Feel free to change the text in that document to test out the feature for other commands.
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
        var dataArray = data.split(",");
        var textArg = dataArray.pop();
        var funcArg = dataArray.pop();

        switch(funcArg){
            case "my-tweets":
                myTweets(textArg);
                break;
            case "spotify-this-song":
                spotifyThisSong(textArg);
                break;
            case "movie-this":
                movieThis(textArg);
                break;
            default: 
                return console.log(`Error!`);
        }

        // console.log(`Function to execute: ${funcArg}`);
        // console.log(`Text to search: ${textArg}`);
    })
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









