$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/tweets/recent",
    dataType: "json"
  })

    .done(function(response){
      for(var i = 0; i < response.length; i++){
      var j = (i + 1)
      var createdAt = (new Date(response[i].created_at))
      var currentTime = Math.floor((Date.now() - (createdAt)) / 1000 / 60)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".full-name").text(response[i].username)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".username").text(response[i].handle)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".timestamp").text(currentTime + " min")

      $("#tweets-container").find("li:nth-child(" + j + ")").find("img").attr("src", response[i].avatar_url)
      $("#tweets-container").find("li:nth-child(" + j + ")").find("p:nth-child(2)").text(response[i].content)
    }
  })

  $("#tweet-form").on("submit", function(event){
    event.preventDefault()
    var data = $(this).find("#new-tweet").val()
    // var hashtag = data.match(/\B#\w*/g)
    // var finalHash = hashtag.join('').substring(1)

    $.ajax({
      method: "POST",
      url: "/tweets",
      dataType: "json",
      data: {tweet: {content: data}}
    })
    .done(function(response){
      console.log(response)
      console.log($("#tweets-container").find("li").last)
      var avatarUrl = response.avatar_url.replace(" ", "+")
      console.log("avatar url", avatarUrl)
      var createdAt = (new Date(response.created_at))
      var currentTime = Math.floor((Date.now()- (createdAt))/1000/60)
      $("#tweets-container").find("ul").prepend("<li class='" + "tweet'>" + "<img class='avatar' src='" + avatarUrl +  "' alt=''/> <div class='tweet-content'><p><span class='full-name'>" + response.username + "</span>" + "<span class='username'>" + response.handle + "</span> <span class='timestamp'>- " + currentTime + "m" + "</span> </p><p>" + response.content + "</p></div></li>" )
      $("#tweets-container").find("ul").children().last().remove()
    })
  })
})
