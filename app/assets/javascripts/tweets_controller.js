$(document).ready(function(){
  var $tweetForm = $("#tweet-form")
  var $tweetRiver = $("#tweets-container").find("ul")
  var $tweetFormContent = $('#new-tweet').val()

// Create TweetsViews object
  var tweetsViews = new TweetsViews

// POST new tweet data to server to create tweet


$tweetForm.on("submit", function(e){
  e.preventDefault();
  handleTweetFormSubmit()
})




 var handleTweetFormSubmit = function(){
  var tweet = new Tweet({content: $tweetFormContent})
  console.log(tweet)
  var data = {tweet: {hashtag_names: tweet.hashtag_names, content: tweet.content}}
  console.log(data)
  var requestAjaxPromise = postTweet(data)
  console.log(requestAjaxPromise)
  requestAjaxPromise.done(function(response){
    prependNewTweet(response)
  })
}

 var postTweet = function(data){
  return $.ajax({ method: 'post', url: '/tweets', dataType: 'JSON', data: data })
 }

 var prependNewTweet = function(response){
  // Prepend response to Tweet River, and animate
  $tweetRiver.prepend(tweetsViews.renderTweet(response)).children().first().hide().fadeIn(200)
  // Remove oldest tweet in Tweet River
  $tweetRiver.children().last().remove()
 }


// GET most recent 50 tweets
  $.ajax({
    method: 'get',
    url: '/tweets/recent'
  })
  .done(function(response){
    tweets = ""
    // Erase current content of $tweetRiver
    $tweetRiver.html("")
    // Append each tweet
    response.forEach(function(tweet){
      $tweetRiver.append(tweetsViews.renderTweet(tweet));
    })
  });


});
