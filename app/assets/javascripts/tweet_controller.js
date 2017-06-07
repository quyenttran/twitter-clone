$(document).ready(function(){
  handleRecentTweets()
})

function handleRecentTweets() {
  var promiseFromAjax = fetchRecent();
  promiseFromAjax.done(function(recentTweetsData){
    showRecent(recentTweetsData)
  })
}
