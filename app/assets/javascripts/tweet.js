function fetchRecent(){
  var recentTweets = $.ajax({
    url: 'http://localhost:3000/tweets/recent',
    dataType: 'json'
  })
  return recentTweets;
}

