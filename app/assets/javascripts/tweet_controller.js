$(document).ready(function(){
  handleRecentTweets()
  handleScrollDown()
})

function handleRecentTweets() {
  var promiseFromAjax = fetchRecent();
  promiseFromAjax.done(function(recentTweetsData){
    showRecent(recentTweetsData.slice(0, 15))
  })
}

function handleScrollDown(){
  $(window).scroll(function () {
    if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
      var promiseFromAjax = fetchRecent();
      promiseFromAjax.done(function(recentTweetsData){
        var liCount = $('#tweets-container').find('li').length
        showMoreTweets(recentTweetsData.slice(liCount, liCount + 3));
      })
    }
  });
}
