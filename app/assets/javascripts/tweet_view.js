function showRecent(recentTweets){
  $('#tweets-container').find('li').remove()
  for(var i = 0; i < recentTweets.length; i++){
    $('#tweets-container').find('ul').append("<li class=\"tweet\">" +
        "<img class=\"avatar\" src=\"" + recentTweets[i].avatar_url + "\" alt=\"\">" +
        "<div class=\"tweet-content\">" +
          "<p>" +
            "<span class=\"full-name\">" + recentTweets[i].username + "</span>" +
            "<span class=\"username\">" + recentTweets[i].handle + "</span>" +
            "<span class=\"timestamp\"> - " +  Math.floor(((new Date() - new Date(recentTweets[i].updated_at))/1000)/60) + "m</span>" +
          "</p>" +
          "<p>" + recentTweets[i].content + "</p>" +
        "</div>" +
      "</li>")
  }
}
