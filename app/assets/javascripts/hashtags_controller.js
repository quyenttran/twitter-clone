$(document).ready(function() {
  var $trending = $("#trends-container").find("ul")
  var $tweetRiver = $("#tweets-container").find("ul")
  var hashtagsViews = new HashtagsViews
  var tweetsViews = new TweetsViews

  $.ajax({
    method: "GET",
    url: "hashtags/popular"
  }).done(function(response) {
    $trending.html("")
    response.forEach(function(tag) {
      $trending.append(hashtagsViews.renderHashtag(tag))
    })
  })

  $("body").on("click", "a.trend", function(e){
    e.preventDefault()
    var that = $(this)
    $.ajax({
      method: "GET",
      url: "tweets/search/" + that.text()
    }).done(function(response) {
      tweets = ""
      // Erase current content of $tweetRiver
      $tweetRiver.html("")
      // Prepend each tweet
      response.forEach(function(tweet){
        $tweetRiver.append(tweetsViews.renderTweet(tweet));
      })
    })
  })


})
