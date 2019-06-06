require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var keys = require("./keys");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commandArgs = process.argv[2];

// * This will show your last 20 tweets and when they were created at in your terminal/bash window.
var myTweets = function() {
    var params = {screen_name: "kaburrows4"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {

    console.log(`\n\n***Tweets***`);
    for (var i = 0; i < 20; i++){
        console.log(`\n**********Chirp Chirp**********\n`);
        console.log(`${tweets[i].text}`);
        console.log(`   Tweet created on: ${tweets[i].created_at}\n`);
        // console.log(`\n*******************************`);

    }
    console.log(`\n\n\****************************\n\n\n`);
  }
});
}


var spotifyThisSong = function(txtFileSong) {
    var song = process.argv.slice(3).join(" ");
    
    if (txtFileSong) {
        song = txtFileSong;
    }

    if (!song){
        song = "Spice Up Your Life";
    }
    spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        var baseDot = data.tracks.items[0];

        var artist = baseDot.album.artists[0].name;
        var songName = baseDot.name;
        var album = baseDot.album.name; 
        var previewLink = baseDot.preview_url;
        var fullSongLink = baseDot.external_urls.spotify;
      
        console.log(`\n\n***********Results***********\n`);
        console.log(`Artist: ${artist}`);
        console.log(`\nSong name: ${songName}`);
        console.log(`\nAlbum: ${album}`);
        console.log(`\nLink to play full album: ${fullSongLink}`);
        console.log(`\n******************************\n\n`)
      });
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

var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
        var dataArray = data.split(",");
        var textArg = dataArray.pop();
        var funcArg = dataArray.pop();

        switch(funcArg) {
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
    })
}

switch(commandArgs) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        return console.log(`That is not a valid entry. Please enter: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"`);
}