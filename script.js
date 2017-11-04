

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

 var movie = $(this).attr("data-name");
 //onkey up function here for 
 //onclick for function button
 $('#submitBtn').on("click", function(){
  
  var movieImput = $("#usr").val().trim();
  console.log(movieImput);
// var for the imdb ajax call
  var queryURL = "http://www.omdbapi.com/?t=" + movieImput +"&y=&plot=short&apikey=40e9cece";
  //ajax call for amdb
  $.ajax({
    url: queryURL,
    method: "GET"
    //response after ajax calls api create function to run response
  }).done(function(response){
    console.log(response)
    //image url for the div that displays movie image
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
   $('#plot').text(plot);
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



  });
 })
 

