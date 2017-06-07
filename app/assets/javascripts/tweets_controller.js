$(document).ready(function(){
  var tweetForm = $("#tweet-form")
  var tweetRiver = $("#tweets-container").find("ul")

// POST new tweet data to server to create tweet
  tweetForm.on("submit", function(event){
    event.preventDefault();
    var $that = $(this);
    var content = $('#new-tweet').val()
    var tweet = {tweet: new NewTweet(content)}
    console.log(tweet)
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweet
    })
    // Prepend response to Tweet River
    .done(function(response){
      tweetRiver.prepend(response)
    });
  });

});
