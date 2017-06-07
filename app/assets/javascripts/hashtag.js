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
    url: "/hashtags/popular",
    dataType: "json"
  })
    .done(function(response){
      for(var i = 0; i < response.length; i++){
      var j = (i + 1)
      $("#trends-container").find("li:nth-child(" + j + ")").text(response[i].name)
    }
  })
})
