function showMatched(matchedTweets){
  $('#search').css('background-color', 'white')
  $('#tweets-container').find('li').remove()
  showMoreTweets(matchedTweets)
}

function showSearchError(){
  $('#search').css('background-color', 'red')
  $('#tweets-container').prepend('<p id="error"><strong>Couldn\'t find any tweets with that hashtag!</strong></p>')
  $('#error').css({'color': 'red', 'margin-left': '70px'}).delay(2000).fadeOut()
}
