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

// movie recommendation function
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
    var ytQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=" + movie + "+trailer&key=AIzaSyAs4LN-8AAtpD25meiR3Upyat-7B-nnqck"
    $.ajax({
      url: ytQuery,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      var trailer = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
      $("#resultCard").append(trailer);
      });

  });
    
};

movieRecommendation();

// TV recommendation function
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

// animate.css
function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

// Button onclick function with animation through all Questionnaire cards
$('#startBtn').click(function() {
  $(function() {
    animateCSS('#introCard', 'slideOutLeft')
    $('#introCard').hide()
  });
  $(function() {
    $('#promptCard1').show()
    animateCSS('#promptCard1', 'slideInRight')
  });
});

$('.card1btn').click(function() {
  $(function () {
    $('#promptCard1').hide()
  });

  $(function() {
    $('#promptCard2').show()
    animateCSS('#promptCard2', 'slideInRight')
  });
});

$('.card2btn').click(function() {
  $(function () {
    $('#promptCard2').hide()
  });

  $(function () {
    $('#promptCard3').show()
    animateCSS('#promptCard3', 'slideInRight')
  });
});

$('.card3btn').click(function() {
  $(function () {
    $('#promptCard3').hide()
  });

  $(function() {
    $('#promptCard4').show()
    animateCSS('#promptCard4', 'slideInRight')
  });
});

// Show loading card
$('.card4btn').click (function(){
  $(function () {
    $('#promptCard4').hide()
  });

  $(function () {
    $('#loadingCard').show()
    animateCSS('#loadingCard', 'slideInUp')
  });
});

// Show result card

// need to put animation delay for result card to show after x seconds
$('#loadingCard').click(function (){
  $(function () {
    $('loading').hide()
  });

  $(function() {
    $('#resultCard').show()
    animateCSS('#resultCard', 'fadeIn')
  });
});