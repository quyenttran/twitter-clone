function showTweetsWithTag(matchedTweets){
  $('#search').css('background-color', 'white')
  $('#tweets-container').find('li').remove()
  showMoreTweets(matchedTweets)
}

