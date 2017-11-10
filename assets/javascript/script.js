
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

  var firebaseMovie = {
    movie: prevMovie
  };
  database.ref().push(firebaseMovie);

  database.ref().on("child_added", function(snapshot){
    $('#footer').append("<tr class='table-row' id=" + "'" + snapshot.val() + "'" + ">" + 
      "<td class='col-xs-12'>" + snapshot.val().movie + "</td>" + "</tr>")
    console.log(firebaseMovie);
  }, function(errorObject){
  });


  var movieImput = $("#usr").val().trim();
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
//     //grabs array for the ratings from 0-3 dif sorces
        var ratings1 = response.Ratings[0]
        var rating1= ratings1.Source
        var ratingval1= ratings1.Value

        var ratings2 = response.Ratings[1]
        var rating2= ratings2.Source
        var ratingval2= ratings2.Value

        var ratings3 = response.Ratings[2]
        var rating3= ratings3.Source
        var ratingval3= ratings3.Value

// //grabs plot from json 
        var plot = response.Plot
//     // console.log(ratingSrc1);
//     //i dont think this is used but dont want to delete it yet
     var ratingValue1 = response.Ratings[1].Source;
//    //var movieImg = $("<img src='response.poster+ +'>" + );
//    //imputing img into img tag in the html div
//    //adds an img to the dom and the atribute is the img src
       var movieImg = $("<img>").attr("src", imgUrl);
//    //imput descrption into the plot paragraph
//    //displayes plot in dom
       $('#midjmbo').text("Plot: " + plot);
//   // var altImg = $('<img>').attr("alt", imgFolder/imageNA.gif);
//    //console.log(altImg);
//    //appends the image into the dom in the correct div
        $('#leftjmbo').append(movieImg);
//    //for loop for grabing all of the ratings


        $('#rightjmbo').append(rating1);
        $('#rightjmbo').append(": " + ratingval1 + "<br>" );
        $
        $('#rightjmbo').append(rating2);
        $('#rightjmbo').append(": " + ratingval2 + "<br>");

        $('#rightjmbo').append(rating3);
        $('#rightjmbo').append(": " + ratingval3);

//        for(var i = 0; i < ratings.length; i++){
// //      //appends the ratings into the DOM in order from sorce to value
        
        // $('.rating' + i).append(ratings[i].Source +"<br>" + ratings[i].Value + "<hr>");

// //     //log ratings
//         console.log(ratings[i])


// }



})


})

