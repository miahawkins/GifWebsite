var animals = ["cat", "dog", "bird", "rabbit", "rooster", "lizard", "fish", "bee", "horse", "cow", "sloth"];


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
	//don't want to send a form
	event.preventDefault();
	//grab the text entered by user into input
	var animal = $("#animal-input").val().trim();
	//add new animal to animals array
	animals.push(animal);
	//call renderbuttons function to render list of animal buttons
	renderButtons();
});
//call renderbuttons function to render intial list of animal buttons
renderButtons();

// Event listener for all button elements
$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-name");
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });