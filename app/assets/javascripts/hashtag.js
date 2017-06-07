$(document).ready(function(){

  $.ajax({
    method: "GET",
    url: "/hashtags/popular",
    dataType: "json"
  })
    .done(function(response){
      for(var i = 0; i < response.length; i++){
      var j = (i + 1)
      $("#trends-container").find("li:nth-child(" + j + ")").text(response[i].name)
    }
  })

$("#search-form").on("focusout", function(e){
  e.preventDefault()
  console.log("hello??")
  var keyword = $("#search").val()
  console.log(keyword)

  $.ajax({
    method: "GET",
    url: "/tweets/search/" + keyword,
    dataType: "json"
  })
  .done(function(response){
    console.log(response.status)
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
    .fail(function(response){
      console.log("FAIL")
      $("#search").css("background-color", "red")
    })
  })


  $("#trends-container").on("click", "li", function(e){
    e.preventDefault()
    var hashTag = $(this).text()
    console.log(hashTag)

    $.ajax({
      method: "GET",
      url: "/tweets/search/" + hashTag,
      data: { name: hashTag},
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

  })

})

