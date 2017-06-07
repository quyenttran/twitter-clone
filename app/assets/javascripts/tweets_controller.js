$(document).ready(function(){
  var $tweetForm = $("#tweet-form")
  var $tweetRiver = $("#tweets-container").find("ul")
  var $tweetFormBody = $('#new-tweet')

// Create TweetsViews object
  var tweetsViews = new TweetsViews

// POST new tweet data to server to create tweet
  $tweetForm.on("submit", function(event){
    event.preventDefault();
    var $that = $(this);
    var tweet = new Tweet({content: $tweetFormBody.val()});
    var data = {tweet: {hashtag_names: tweet.hashtag_names, content: tweet.content}}
    $.ajax({
      method: 'post',
      url: '/tweets',
      dataType: 'JSON',
      data: data
    })
    // Prepend response to Tweet River
    .done(function(response){
      $tweetRiver.prepend(tweetsViews.renderTweet(response))
    });
  });

// GET most recent 50 tweets
  $.ajax({
    method: 'get',
    url: '/tweets/recent'
  })
  .done(function(response){
    tweets = ""
    // Erase current content of $tweetRiver
    $tweetRiver.html("")
    // Prepend each tweet
    response.forEach(function(tweet){
      $tweetRiver.append(tweetsViews.renderTweet(tweet));
    })
  });


});
