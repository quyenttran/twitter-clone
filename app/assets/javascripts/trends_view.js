function showTweetsWithTag(matchedTweets){
  $('#search').css('background-color', 'white')
  $('#tweets-container').find('li').remove()
  for(var i = 0; i < matchedTweets.length; i++){
    $('#tweets-container').find('ul').append("<li class=\"tweet\">" +
        "<img class=\"avatar\" src=\"" + matchedTweets[i].avatar_url + "\" alt=\"\">" +
        "<div class=\"tweet-content\">" +
          "<p>" +
            "<span class=\"full-name\">" + matchedTweets[i].username + "</span>" +
            "<span class=\"username\">" + matchedTweets[i].handle + "</span>" +
            "<span class=\"timestamp\"> - " +  minutesSinceTweet(matchedTweets[i].updated_at) + "m</span>" +
          "</p>" +
          "<p>" + matchedTweets[i].content + "</p>" +
        "</div>" +
      "</li>")
  }
}

