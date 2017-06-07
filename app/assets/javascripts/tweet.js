$(document).ready(function(){

  // var hashTagger = function(json){
  //   json.forEach(function(hashTag){
  //     thi
  //   })
  //
  //
  // }

  $.ajax({
    method: "GET",
    url: "/tweets/recent",
    dataType: "json"
  })

    .done(function(response){
      for(var i = 0; i < response.length; i++){
      var j = (i + 1)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".full-name").text(response[i].username)
      console.log($("#tweets-container").find("li:nth-child(" + j + ")").find("img"))
      $("#tweets-container").find("li:nth-child(" + j + ")").find("img").attr("src", response[i].avatar_url)
    }
  })
})
