function fetchTags(event){
  event.preventDefault();
  var search = $('#search').val();
  var matchedTweets = $.ajax({
    url: 'http://localhost:3000/tweets/search/' + search,
    dataType: 'json'
  })
  return matchedTweets;
}

