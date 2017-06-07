// model for recent
function requestRecent() {
  // console.log("request recent")
  var request = $.ajax({
      method: 'get',
      url: '/tweets/recent'
    });
    return request
}

// views for recent


// controller for recent



$(document).ready(function(event) {
  controlRecent(requestRecent());
  var tweet = $(".tweet").first()

  function displayAvatar(url) {
    // console.log(url)
    // console.log(tweet.find(".avatar").attr('src', url))
    tweet.find(".avatar").attr('src', url)
  }
  function displayFullName(username) {
    console.log("first name", tweet.find(".full-name"))
    tweet.find(".full-name").text(username)
  }
  function displayUsername(handle) {
    tweet.find(".username").text(handle)
  }
  function displayTimestamp(timestamp) {
    tweet.find(".timestamp").text(timestamp)
  }
  function displayContent(content) {
    tweet.find(".tweet-content").find("p").first().next().text(content)
  }
  function displayTweet(tweet) {
    displayAvatar(tweet.avatar_url)
    displayFullName(tweet.username);
    displayUsername(tweet.handle);
    displayTimestamp(tweet.created_at);
    displayContent(tweet.content);
  }

  function controlRecent(recentTweets) {
    recentTweets.done(function(response){
      for(var i=0; i<response.length; i++) {
        displayTweet(response[i])
      }
    })
  }
})
