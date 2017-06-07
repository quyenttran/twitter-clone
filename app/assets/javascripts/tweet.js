function fetchRecent(){
  var recentTweets = $.ajax({
    url: 'http://localhost:3000/tweets/recent',
    dataType: 'json'
  })
  return recentTweets;
}

function timeSinceTweet(tweetUpdated){
  var minutes = Math.floor(((new Date() - new Date(tweetUpdated))/1000)/60)
  if(minutes < 60){
    return minutes + 'm'
  }else{
    return Math.floor(minutes/60) + 'h'
  }
  // return Math.floor(((new Date() - new Date(tweetUpdated))/1000)/60)
}
