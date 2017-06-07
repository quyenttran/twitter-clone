function fetchTweetsWithTag(tag){
  var tweets = $.ajax({
    url: 'http://localhost:3000/tweets/search/' + tag,
    dataType: 'json'
  })
  return tweets;
}
