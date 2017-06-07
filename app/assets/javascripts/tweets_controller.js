$(document).ready(function() {
  fetchRecentTweets();
  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    var tweetContent = $("#new-tweet").val();
    var tweetHashtags = findHashtags(tweetContent);
    $.ajax({
      method: "post",
      url: "/tweets",
      data: { tweet: {content: tweetContent} , hashtags: tweetHashtags }
    }).done(function(response){
      console.log(response)
      $("#tweets-container").find("ul").prepend(renderTweet(response));
    })
  })
})

function findHashtags(tweet) {
  var hashtags = []
  tweet.split(" ").forEach(function(word) {
    if (word.includes("#")) {
    hashtags.push(word.substring(1))
    }
  })
  return hashtags;
}

function renderTweet(tweet) {
  return "<li class='tweet'><img class='avatar' src='" + tweet.avatar_url + "' alt=''><div class='tweet-content'><p><span class='full-name'>" + tweet.username + "</span><span class='username'>" + tweet.handle + "</span><span class='timestamp'>- " + tweet.created_at + "</span></p><p>" + tweet.content + "</p></div></li>"
}

function fetchRecentTweets() {
  var recentTweets;
  $.get("/tweets/recent", function(data) {
  recentTweets = data;
  recentTweets.forEach(function(tweet){
    $("#tweets-container").find("ul").append(renderTweet(tweet));
    })
  })
}




