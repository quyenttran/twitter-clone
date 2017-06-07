function fetchRecent(){
  var recentTweets = $.ajax({
    url: 'http://localhost:3000/tweets/recent',
    dataType: 'json'
  })
  return recentTweets;
}

function minutesSinceTweet(tweetUpdated){
  return Math.floor(((new Date() - new Date(tweetUpdated))/1000)/60)
}
