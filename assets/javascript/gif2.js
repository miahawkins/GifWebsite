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
		
	});
	//call renderbuttons function to render intial list of animal buttons
	renderButtons();

	function getGifs() {
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
	    .done(function(result) {
	    	var dataArray = result.data;
	    	$("gifs-appear-here").empty();
	    	for (var i = 0; i < dataArray.length; i++) {
	    		var gifDiv = $("<div>");
	    		gifDiv.addClass("gif");

	    		var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
	    		gifDiv.prepend(newRating);

	    		var animalImage = $("<img>");
	    		animalImage.attr("src", dataArray[i].images.fixed_height_still.url);
	    		animalImage.attr("data-still", dataArray[i].images.fixed_height_still.url);
	    		animalImage.attr("data-animate", dataArray[i].images.fixed_height.url);
	    		animalImage.attr("data-state", "still");

	    		gifDiv.prepend(animalImage);

	    		$("gifs-appear-here").prepend(gifDiv);
      
	    	}
	    });

	}

	function animateGif() {
		var state = $(this).find("img").attr("data-state");

		if (state === "still") {
	        $(this).find("img").attr("src", $(this).attr("data-animate"));
	        $(this).find("img").attr("data-state", "animate");
	    }
	    else {
	        $(this).find("img").attr("src", $(this).attr("data-still"));
	        $(this).find("img").attr("data-state", "still");
		}

	}

	renderButtons();
	

});
$(document).on("click", ".animal", getGifs);

$(document).on("click", ".gif", animateGif);






