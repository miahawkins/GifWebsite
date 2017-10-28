$(document).ready(function() {



	var animals = ["bird", "rabbit", "rooster", "lizard", "fish", "bee", "horse", "cow", "sloth", "kangaroo", "kitten"];


	function renderButtons() {
	 	$("#animalButtons").empty();

	 	for (var i = 0; i < animals.length; i++) {
	 		//dynamically generate buttons for each movie in array
	 		var a = $("<button>");
	 		//add class of each movie
	 		a.addClass("animal");
	 		//add data attribute
	 		a.attr("data-name", animals[i]);
	 		//provide initial button text
	 		a.text(animals[i]);
	 		//adding the button to the animalButtons div
	 		$("#animalButtons").append(a);
	 	}
	 	
	}


	//function where the add animal button is clicked
	$("#addAnimal").on("click", function(event) {
		// prevent page from refreshing when form tries to submit itself
		event.preventDefault();
		//grab the text entered by user into input
		var animal = $("#animal-input").val().trim();
		//add new animal to animals array
		animals.push(animal);
		$("#animal-input").val("");
		//call renderbuttons function to render list of animal buttons
		renderButtons();
		getGifs();
		
	});
	//call renderbuttons function to render intial list of animal buttons
	renderButtons();

	
	function getGifs() {
		$("#gifs-appear-here").html("");
	    // In this case, the "this" keyword refers to the button that was clicked
	    var animal = $(this).attr("data-name");
	    console.log(animal)
	      // Constructing a URL to search Giphy for the name of the person who said the quote
	      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
	      // Performing our AJAX GET request
	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        // After the data comes back from the API
	        .done(function(response) {
	          // Storing an array of results in the results variable
	          var results = response.data;
	          // Looping over every result item to add the associated rating
	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item'>");

	            var rating = results[i].rating;

	            var p = $("<p>").text("Rating: " + rating);
	            // adding classes and attributes to the gifs
	            var animalImage = $("<img>");
	            animalImage.addClass("gif");
	            animalImage.attr("src", results[i].images.fixed_height.url);
	            // animalImage.attr("data-still", results[i].images.fixed_height_still.url);   ///
	            // animalImage.attr("data-animate", results[i].images.fixed_height.url);       ///

	           	// .attr("data-state", "still");       ///

	            gifDiv.prepend(p);
	            gifDiv.prepend(animalImage);


	            $("#gifs-appear-here").prepend(gifDiv);
	          }

	          // $(".gif").on("click", function() {                   ///
	          // 	var state = $(this).attr("data-state");
	          // 	console.log(this)

	          // 	if (state == "still") {
	          // 		$(this).attr("src", $(this).data("animate"));
	          // 		$(this).attr("data-state", "animate");
	          // 	}
	          // 	else {
	          // 		$(this).attr("src", $(this).data("still"));
	          // 		$(this).attr("data-state", "still");
	          	
	        });
	}

	// Event listener for all button elements
	$("button").on("click", function() {
		//clears gif div so that the page only hold one animal's gifs at a time
		$("#gifs-appear-here").html("");
	    // In this case, the "this" keyword refers to the button that was clicked
	    var animal = $(this).attr("data-name");
	    console.log(animal)
	      // Constructing a URL to search Giphy for the name of the person who said the quote
	      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
	      // Performing our AJAX GET request
	      $.ajax({
	          url: queryURL,
	          method: "GET"
	        })
	        // After the data comes back from the API
	        .done(function(response) {
	          // Storing an array of results in the results variable
	          var results = response.data;
	          // Looping over every result item to add the associated rating
	          for (var i = 0; i < results.length; i++) {
	            var gifDiv = $("<div class='item'>");

	            var rating = results[i].rating;

	            var p = $("<p>").text("Rating: " + rating);
	            // adding classes and attributes to the gifs
	            var animalImage = $("<img>");
	            animalImage.addClass("gif");
	            animalImage.attr("src", results[i].images.fixed_height.url);
	            // animalImage.attr("data-still", results[i].images.fixed_height_still.url);   ///
	            // animalImage.attr("data-animate", results[i].images.fixed_height.url);       ///

	           	// .attr("data-state", "still");       ///

	            gifDiv.prepend(p);
	            gifDiv.prepend(animalImage);


	            $("#gifs-appear-here").prepend(gifDiv);
	          }

	          // $(".gif").on("click", function() {                   ///
	          // 	var state = $(this).attr("data-state");
	          // 	console.log(this)

	          // 	if (state == "still") {
	          // 		$(this).attr("src", $(this).data("animate"));
	          // 		$(this).attr("data-state", "animate");
	          // 	}
	          // 	else {
	          // 		$(this).attr("src", $(this).data("still"));
	          // 		$(this).attr("data-state", "still");
	          	
	        });
	});
});


$(document).on("click", ".animal", getGifs);









