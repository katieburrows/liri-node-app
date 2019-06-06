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


var spotifyThisSong = function() {
    var song = process.argv.slice(3).join(" ");
    if (!song) {
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
      
        console.log(`artist: ${artist}`);
        console.log(`song name: ${songName}`);
        console.log(`album: ${album}`);
        console.log(`preview link: ${previewLink}`);
      });
}


// {
//     "tracks": {
//       "href": "https://api.spotify.com/v1/search?query=The+Sign&type=track&offset=0&limit=1",
//       "items": [
//         {
//           "album": {
//             "album_type": "single",
//             "artists": [
//               {
//                 "external_urls": {
//                   "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
//                 },
//                 "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
//                 "id": "69GGBxA162lTqCwzJG5jLp",
//                 "name": "The Chainsmokers",
//                 "type": "artist",
//                 "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
//               }
//             ],
//             "available_markets": [

//             ],
//             "external_urls": {
//               "spotify": "https://open.spotify.com/album/17knWaxhmQjegn5eJgGVyL"
//             },
//             "href": "https://api.spotify.com/v1/albums/17knWaxhmQjegn5eJgGVyL",
//             "id": "17knWaxhmQjegn5eJgGVyL",
//             "images": [
//               {
//                 "height": 640,
//                 "url": "https://i.scdn.co/image/60c75157f92cfe3c81070ad956f8c9a495e171ee",
//                 "width": 640
//               },
//               {
//                 "height": 300,
//                 "url": "https://i.scdn.co/image/0a153924f9c96f962bdfbcc8cbd4401a22156b32",
//                 "width": 300
//               },
//               {
//                 "height": 64,
//                 "url": "https://i.scdn.co/image/31ad597c04ac5ea8d5a7317d53fbd4d81b561765",
//                 "width": 64
//               }
//             ],
//             "name": "World War Joy...Do You Mean",
//             "release_date": "2019-04-26",
//             "release_date_precision": "day",
//             "total_tracks": 3,
//             "type": "album",
//             "uri": "spotify:album:17knWaxhmQjegn5eJgGVyL"
//           },
//           "artists": [
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/69GGBxA162lTqCwzJG5jLp"
//               },
//               "href": "https://api.spotify.com/v1/artists/69GGBxA162lTqCwzJG5jLp",
//               "id": "69GGBxA162lTqCwzJG5jLp",
//               "name": "The Chainsmokers",
//               "type": "artist",
//               "uri": "spotify:artist:69GGBxA162lTqCwzJG5jLp"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/7c0XG5cIJTrrAgEC3ULPiq"
//               },
//               "href": "https://api.spotify.com/v1/artists/7c0XG5cIJTrrAgEC3ULPiq",
//               "id": "7c0XG5cIJTrrAgEC3ULPiq",
//               "name": "Ty Dolla $ign",
//               "type": "artist",
//               "uri": "spotify:artist:7c0XG5cIJTrrAgEC3ULPiq"
//             },
//             {
//               "external_urls": {
//                 "spotify": "https://open.spotify.com/artist/5vBrKGOjN10BMwB0cJADj4"
//               },
//               "href": "https://api.spotify.com/v1/artists/5vBrKGOjN10BMwB0cJADj4",
//               "id": "5vBrKGOjN10BMwB0cJADj4",
//               "name": "bülow",
//               "type": "artist",
//               "uri": "spotify:artist:5vBrKGOjN10BMwB0cJADj4"
//             }
//           ],
//           "available_markets": [

//           ],
//           "disc_number": 1,
//           "duration_ms": 193175,
//           "explicit": false,
//           "external_ids": {
//             "isrc": "USQX91900937"
//           },
//           "external_urls": {
//             "spotify": "https://open.spotify.com/track/5MvLsT03RBp67RLoeISCdl"
//           },
//           "href": "https://api.spotify.com/v1/tracks/5MvLsT03RBp67RLoeISCdl",
//           "id": "5MvLsT03RBp67RLoeISCdl",
//           "is_local": false,
//           "name": "Do You Mean (with Ty Dolla $ign & bülow)",
//           "popularity": 83,
//           "preview_url": "https://p.scdn.co/mp3-preview/cd53826cc7865a498b2c3615a396e25297bbc849?cid=b9e2b867c94d4d09bcf176731c97f6a7",
//           "track_number": 1,
//           "type": "track",
//           "uri": "spotify:track:5MvLsT03RBp67RLoeISCdl"
//         }
//       ],
//       "limit": 1,
//       "next": "https://api.spotify.com/v1/search?query=The+Sign&type=track&offset=1&limit=1",
//       "offset": 0,
//       "previous": null,
//       "total": 17249
//     }
//   }







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