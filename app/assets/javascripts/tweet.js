function fetchRecent(){
  var recentTweets = $.ajax({
    url: 'http://localhost:3000/tweets/recent',
    dataType: 'json'
  })
  console.log('recent tweets in model are ' + recentTweets)
  return recentTweets;
}

