$(document).ready(function() {
  var trending = $("#trends-container").find("ul")

  $.ajax({
    method: "GET",
    url: "hashtags/popular"
  }).done(function(response) {
    trending.html("")
    response.forEach(function(tag) {
      var span = "<span style='color: grey'> &#128038; " + tag.hashtag_count + "| </span>"
      var search_path = '/tweets/search/' + tag.name
      var link = "<a class='trend' href='" + search_path + "'>" + tag.name + "</a>"
      trending.append("<li>" + span + link + "</li>")
    })
  })

  $("body").on("click", "a.trend", function(e){
    e.preventDefault()
    var that = $(this)
    $.ajax({
      method: "GET",
      url: "tweets/search/" + that.text()
    }).done(function(response) {
      console.log(response)
    })
  })


})
