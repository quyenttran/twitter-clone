$(document).ready(function() {
  var trending = $("#trends-container").find("ul")

  $.ajax({
    method: "GET",
    url: "hashtags/popular"
  }).done(function(response) {
    trending.html("")
    response.forEach(function(tag) {
      var span = ", <span style='color: grey'>" + tag.hashtag_count + "</span>"
      trending.prepend("<li>" + tag.name + span + "hits </li>")
    })
  })
})
