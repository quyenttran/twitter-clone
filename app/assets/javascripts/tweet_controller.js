$(document).ready(function(){
  handleRecentTweets()
})

function handleRecentTweets() {
  var promiseFromAjax = fetchRecent();
  promiseFromAjax.done(function(recentData){
    console.log(new Date(recentData[0].updated_at))
    console.log(Math.floor(((new Date() - new Date(recentData[0].updated_at))/1000)/60))
    showRecent(recentData)
  })
}
