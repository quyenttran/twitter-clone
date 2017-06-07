function fetchRecentTweets() {
  $.get("http://localhost:3000/tweets/recent", function(data) {
    recentTweets = data;
  })
  return recentTweets;
}


