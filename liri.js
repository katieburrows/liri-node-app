//****Dependencies****//
require("dotenv").config();

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var axios = require("axios");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);
//*************************//


//Variable that collects the user's first command argument.
var commandArgs = process.argv[2];

//Function that interacts with Twitter's NPM--displays my last 20 tweets and when they were created.
var myTweets = function() {
    
    //Syntax from NPM package:
    var params = {screen_name: "kaburrows4"};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        
        //If no error then get the tweets.
        if (!error) {

            //Tweets display:
            //Looping through 20 tweet data responses and displaying them in the CLI and also stylizing the output with line breaks and asterisks. 
            console.log(`\n\n***Tweets***`);

            for (var i = 0; i < 20; i++){

                console.log(`\n**********Chirp Chirp**********\n`);

                console.log(`${tweets[i].text}`);

                console.log(`   Tweet created on: ${tweets[i].created_at}\n`);
            }

            console.log(`\n\n\****************************\n\n\n`);
        }
    });
}

//Function that interacts with Spotify's NPM--it allows the user to input a song and I'll pull back data related to that song (the artist, song name, album it's from, and a link to play the song and full album on Spotify).  If no song is entered in the CLI then the default song is Spice Girls' Spice Up Your Life.
var spotifyThisSong = function(txtFileSong) {

    //Variable that stores the song argument from the CLI.  I'm slicing at the 3rd position where the song argument would start if there is one.  Then I am converting the array back so that it can interact with the Spotify package.
    var song = process.argv.slice(3).join(" ");
    
    //Conditional from another function, doWhatItSays(), that when called passes through the txtFileSong parameter from the random.txt file.  This then sets the song variable to be the value in the random.txt file.
    if (txtFileSong) {
        song = txtFileSong;
    }

    //Conditional that checks to see if there is a song either from the random.txt file or the CLI.  If no song then the default song is the Spice Girls' Spice Up Your Life.
    if (!song){
        song = "Spice Up Your Life";
    }

    //Spotify NPM syntax:
    spotify.search({ type: "track", query: song, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        //Variable shortcut to reduce the number of times the lengthy dot notation has to be retyped.
        var baseDot = data.tracks.items[0];

        //Variable pointing to the artist of the song.
        var artist = baseDot.album.artists[0].name;

        //Variable pointing to the song name.  This variable could either be pulled the hard way (like I did here) using dot notation, or just grabbed from the CLI. 
        var songName = baseDot.name;

        //Variable pointing to the album name.
        var album = baseDot.album.name; 

        //Variable that takes you to Spotify to play the song and the album it comes from.
        var fullSongLink = baseDot.external_urls.spotify;
      
        //Song display, styled with asterisks and line breaks for readability and standout-ability.
        console.log(`\n\n***********Results***********\n`);
        console.log(`Artist: ${artist}`);
        console.log(`\nSong name: ${songName}`);
        console.log(`\nAlbum: ${album}`);
        console.log(`\nLink to play full album: ${fullSongLink}`);
        console.log(`\n******************************\n\n`)
      });
}

//Function that interacts with the Online Movie Database.
var movieThis = function(movie) {

    //Variable that grabs the user's movie from the CLI.  Slicing at the 3rd position where the argument would start if there is one.  Then joining it back together with plus signs so that the request can be sent to the API via axios.
    var movieTitle = process.argv.slice(3).join("+");

    //Conditional that interacts with the doWhatItSays() function.  If a movie argument is passed through from the random.txt file then movie has a value and the movieTitle variable is now set to the random.txt file's value. 
    if (movie){

        //Setting the movieTitle variable equal to the random.txt file's value then formatting the value in the random.txt file to be congrous with OMBD syntax requirements.
        movieTitle = movie.split(" ").slice(1).join("+")
    }

    //Conditional to check that there is no value for movieTitle or movie and setting the variable movieTitle to a default movie: Mr. Nobody.
    if (!movieTitle && !movie){
        movieTitle = "Mr. Nobody";
    }

    //Variable that sets up the query to OMBD
    var queryUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";

    //Using axios' syntax to make our call to OMDB
    axios.get(queryUrl).then(
        function(response) {

            //Making a variable to reduce the number of times I have to write response.data.
            var baseline = response.data;

            //Movie display, styled with asterisks and line breaks for readability and standout-ability.  What's displayed is the movie title, the year it was released, the movie rating from OMDB and Rotten Tomatoes, the country where the movie was produced, the languages the movie is available in, the plot of the movie, and the actors in the movie.
            console.log("\n********** Movie Data **********\n");
            console.log(`     Movie title: ${baseline.Title}\n     Year released: ${baseline.Year}\n     OMDB rating: ${baseline.Ratings[0].Value}\n     Rotten Tomatoes rating: ${baseline.Ratings[1].Value}\n     Country where movie was produced: ${baseline.Country}\n     Language: ${baseline.Language}\n     Plot: ${baseline.Plot}\n     Actors: ${baseline.Actors}`); 
            console.log("\n********************************\n");
    })

}

//Function that reads the random.txt file and figures out what to do with what's entered into it.
var doWhatItSays = function() {

    //fs syntax to read random.txt file.
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }

        //Taking the text in random.txt and turning it into an array split on commas.
        var dataArray = data.split(",");

        //Taking the newly created array and popping off the last member and calling that the textArg.  It's the name of whatever movie/song that can be searched.
        var textArg = dataArray.pop();

        //Taking the array and popping off the last member of it and calling it the funcArg.  It's the text that will determine which function is called.
        var funcArg = dataArray.pop();

        //Switch case based off of the funcArg--which holds the text for which function to call.  For the spotify and twitter functions the textArg is passed in as an argument so that the function being called has the right data-source (CLI argument v. random.txt data).
        switch(funcArg) {
            case "my-tweets":
                myTweets();
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

//Switch case that takes in the variable commandArgs and determines what function should be called.  If the user inputs an invalid function or misspells one of the command options then an error with a message containing the valid operators will be displayed back to the user.
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