// model for recent
function requestRecent() {
  var request = $.ajax({
      method: 'get',
      url: '/tweets/recent'
  });
  return request
}

$(document).ready(function(event) {
  var tweet = $(".tweet")

  // views for recent
  function displayAvatar(url, i) {
    tweet.eq(i).find(".avatar").attr('src', url)
  }
  function displayFullName(username, i) {
    tweet.eq(i).find(".full-name").text(username)
  }
  function displayUsername(handle, i) {
    tweet.eq(i).find(".username").text(handle)
  }
  function displayTimestamp(timestamp, i) {
    tweet.eq(i).find(".timestamp").text(timestamp)
  }
  function displayContent(content, i) {
    tweet.eq(i).find(".tweet-content").find("p").first().next().text(content)
  }
  function displayTweet(tweet, i) {
    displayAvatar(tweet.avatar_url, i)
    displayFullName(tweet.username, i);
    displayUsername(tweet.handle, i);
    displayTimestamp(tweet.created_at, i);
    displayContent(tweet.content, i);
  }

  // controller for recent
  function controlRecent(recentTweets) {
    recentTweets.done(function(response){
      for(var i=0; i<response.length; i++) {
        displayTweet(response[i], i)
      }
    })
  }

  controlRecent(requestRecent());
})
