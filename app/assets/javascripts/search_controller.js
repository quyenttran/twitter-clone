$(document).ready(function(){
  $('#search-form').on('submit', function(event){
    handleMatchedTweets(event)
    $(window).unbind("scroll");
  })
})

function handleMatchedTweets(event){
  var promiseFromAjax = fetchTags(event);
  promiseFromAjax.done(function(matchedTweetsData){
    showMatched(matchedTweetsData)
  })
  promiseFromAjax.fail(function(){
    makeSearchRed()
  })
}
