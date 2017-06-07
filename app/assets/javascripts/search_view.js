function showMatched(matchedTweets){
  $('#search').css('background-color', 'white')
  $('#tweets-container').find('li').remove()
  showMoreTweets(matchedTweets)
}

function makeSearchRed(){
  $('#search').css('background-color', 'red')
}
