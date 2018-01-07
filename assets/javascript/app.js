var animalArray = ["dog", "cat", "mouse", "elephant", "bird", "squirrel", "tiger", "lion"];

function renderButtons() {
    $("#labels").empty();
    for (var i = 0; i < animalArray.length; i++){
        var a = $("<button>");
        a.addClass("animalClass btn btn-warning");
        a.attr("data-name", animalArray[i]);
        a.text(animalArray[i]);
        $("#labels").append(a);
    }
}

$("#add-animal").on("click", function(event){
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    if(animalArray.includes(animal) === false){
    animalArray.push(animal);
    renderButtons();
    }
});
renderButtons();

$(document.body).on("click", ".animalClass", function(){
    var anim = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    anim + "&api_key=QOqfx958RxX3hJwWED9g26sgzh1zDbdU&limit=10&rating=pg";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(response) {
        console.log(queryURL);

        console.log(response);
        
        var results = response.data;

        //clear the old animal out
        $("#images").html(" ");
        
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var animalDiv = $("<span>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var animalImage = $("<img>");
          animalImage.addClass("gif");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-state","still");
          animalImage.attr("data-animate", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          animalDiv.append(p);
          animalDiv.append(animalImage);
          animalDiv.addClass("animalDiv")

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#images").prepend(animalDiv);
        }
    });
});
$(document.body).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });