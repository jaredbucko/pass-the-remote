// global variables
var userInputs = {};
var modern = "2000-01-01";
var classic = "1900-01-01";
var era
var genre = "35";
var rating = 7;

// log TMDb genres
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

// PTR recommendation function
function movieRecommendation() {

  era = modern;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + genre + "&vote_average.gte=" + rating + "&primary_release_date.gte=" + era + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}",
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var x = parseInt(Math.random()*response.results.length);
    var movie = response.results[x].original_title;
    console.log(movie);

    $.ajax({
      url: "http://www.omdbapi.com/?apikey=63f86544&t=" + movie,
      type: "GET",
    }).then(function(response) {
      console.log(response);
      var imdb = parseFloat(response.Ratings[0].Value)*10;
      console.log(imdb);
      var rotten = parseInt(response.Ratings[1].Value);
      console.log(rotten);
      var meta = parseInt(response.Ratings[2].Value);
      console.log(meta);
    });

  });
};

movieRecommendation();

// PTR tv recommendation function
function tvRecommendation() {

  era = modern;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&with_genres=" + genre + "&vote_average.gte=" + rating + "&timezone=America%2FNew_York&page=1&first_air_date.gte=" + era + "&sort_by=popularity.desc&language=en-US&with_original_language=en&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var x = parseInt(Math.random()*response.results.length);
    var series = response.results[x].original_name;
    console.log(series);
  });
};

tvRecommendation();