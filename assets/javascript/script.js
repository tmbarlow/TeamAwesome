
var firebaseMovie, clickedMovie ;
var storeMovies = [];

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaZ1LcyBesahUykobyTf8n6V54DueEPsM",
    authDomain: "movies247-439bd.firebaseapp.com",
    databaseURL: "https://movies247-439bd.firebaseio.com",
    projectId: "movies247-439bd",
    storageBucket: "movies247-439bd.appspot.com",
    messagingSenderId: "219018323429"
  };
  firebase.initializeApp(config);



  var database = firebase.database();

  var movie = $(this).attr("data-name");
 //onkey up function here for 

 //onclick for function button
$('#submitBtn').on("click", function(){
  showMovie()
});

function showMovie(clickedMovie){
  $('#bodyContainer').show();
  $('#des').show();
  $('#footerHold').show();
 
  $('#plot').empty();
  $('#leftjmbo').empty();
  $('#midjmbo').empty();
  $('#footer').empty();
  $('#prevSrch').empty();

   $('#rightjmbo').empty(); 

  
   

  var prevMovie = $('#usr').val().trim();

  console.log(clickedMovie, 'this is our clicked movie')
  if(clickedMovie == undefined){
    var movieImput = $("#usr").val().trim();
    firebaseMovie = {
      movie: prevMovie
    };
    database.ref().push(firebaseMovie);
  }else{
    var movieImput = clickedMovie;
  }
  console.log(movieImput);
  // var for the imdb ajax call
  var trailerQueryURL = "https://api.themoviedb.org/3/search/movie?api_key=1e9f1ca0ed707436520df7bdd6719967&query=" + movieImput;


  var queryURL = "http://www.omdbapi.com/?t=" + movieImput +"&y=&plot=short&apikey=40e9cece";

  $.ajax({
    url: queryURL, 
    method: "GET"
  }).done(function(response){
    console.log(response);


  //ajax call for amdb
    $.ajax({
      url: trailerQueryURL,
      method: "GET"
      //response after ajax calls api create function to run response
    }).done(function(trailerResponse){
      console.log(trailerResponse);
      console.log(trailerResponse.results[0].id);
      //image url for the div that displays movie image
      
      var movieId = trailerResponse.results[0].id;

      var movieURL = "https://api.themoviedb.org/3/movie/"+ movieId + "/videos?api_key=1e9f1ca0ed707436520df7bdd6719967&language=en-US";

      $.ajax({
        url: movieURL, 
        method: "GET"
      }).done(function(nextResponse){
        console.log(nextResponse);
        console.log(nextResponse.results[0].key);

        var youTubeVideo = nextResponse.results[0].key;

        var youTubeURL = "https://www.youtube.com/embed/" + youTubeVideo;
        console.log(youTubeURL)
        var trailerImg = $("<iframe width=854 height=480 allowfullscreen>").attr("src", youTubeURL);
        $('#plot').append(trailerImg);

  

        // <iframe width="854" height="480" src="https://www.youtube.com/embed/FnCdOQsX5kc" frameborder="0" gesture="media" allowfullscreen></iframe>
      });


    });

    var imgUrl = response.Poster;
     //grabs array for the ratings from 0-3 dif sorces
    var ratings = response.Ratings
      //grabs plot from json 
    var plot = response.Plot
    // console.log(ratingSrc1);
    //i dont think this is used but dont want to delete it yet
    var ratingValue1 = response.Ratings[1].Source;
    //var movieImg = $("<img src='response.poster+ +'>" + );
    //imputing img into img tag in the html div
    //adds an img to the dom and the atribute is the img src
    var movieImg = $("<img>").attr("src", imgUrl);
    //imput descrption into the plot paragraph
    //displayes plot in dom
    $('#midjmbo').text(plot);
    // var altImg = $('<img>').attr("alt", imgFolder/imageNA.gif);
    //console.log(altImg);
    //appends the image into the dom in the correct div
    $('#leftjmbo').append(movieImg);
   //for loop for grabing all of the ratings
    for(var i = 0; i < ratings.length; i++){
      //appends the ratings into the DOM in order from sorce to value
    
    $('.rating' + i).append(ratings[i].Source +"<br>" + ratings[i].Value + "<hr>");

     //log ratings
     console.log(ratings[i])

    }
  })
}
database.ref().on("value", function(snapshot){
  console.log(snapshot.val(), "this is our snap value")
  var movieNames = [];
  storeMovies = [];
  $("#footer").empty()
  
  snapshot.forEach(function(childSnapshot) {
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    movieNames.push(childSnapshot.val().movie)
    // childData will be the actual contents of the child
    $('#footer').append("<tr class='table-row' id='prevMovie' data-movie='" + childSnapshot.val().movie + "'>" + 
    "<td class='col-xs-12'>" + childSnapshot.val().movie + "</td>" + "</tr>")
});
  storeMovies = movieNames
  console.log(firebaseMovie);
}, function(errorObject){
});

$("#footer").on("click", "#prevMovie", function() {
  clickedMovie = $(this).attr("data-movie")
  console.log("you clicked this txt");
  showMovie(clickedMovie)
  for(var i = 0; i < storeMovies.length; i++){
    $('#footer').append("<tr class='table-row' id='prevMovie' data-movie='" + storeMovies[i] + "'>" + 
    "<td class='col-xs-12'>" + storeMovies[i] + "</td>" + "</tr>")
  }
  })


// }








