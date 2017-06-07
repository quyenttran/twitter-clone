$(document).ready(function(){
  handleRecentTweets()
})

function handleRecentTweets() {
  var promiseFromAjax = fetchRecent();
  promiseFromAjax.done(function(recentData){
    showRecent(recentData)
  })
}
