function fetchRecentTweets() {
  $.get("http://localhost:3000/tweets/recent", function(data) {
    recentTweets = data;
  })
  return recentTweets;
}

function renderTweet(tweet) {
  return "<li class='tweet'><img class='avatar' src='" + tweet.avatar_url + "' alt=''><div class='tweet-content'><p><span class='full-name'>" + tweet.username + "</span><span class='username'>" + tweet.handle + "</span><span class='timestamp'>- " + tweet.created_at + "</span></p><p>" + tweet.content + "</p></div></li>"
}

