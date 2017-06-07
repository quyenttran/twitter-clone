$(document).ready(function() {

  $("#tweet-form").on("submit", function(e) {
    e.preventDefault()
    handleCreateTweet();
  })


})

function Tweet(content) {
  this.content = content;
}

function createTweet(newTweet) {
  dataToSend = {"tweet": {"content": newTweet.content}}

  var requestPromise = $.ajax({url: "/tweets", method: "POST", data: dataToSend});

  return requestPromise;
}

function handleCreateTweet() {
  var tweet = new Tweet($("#new-tweet").val())

  var promiseFromAjax = createTweet(tweet);

  promiseFromAjax.done(function(tweetInfo) {
    showNewTweet(tweetInfo);
  })
}

function showNewTweet(tweet) {
  $("#tweets-container > ul").children().last().remove()
  $("#tweets-container > ul").animate({
    marginTop: "+=73px"
  }, 500)

  $("#tweets-container > ul").animate({
    marginTop: "-=73px"
  }, 1, function() {
    $("#tweets-container > ul").prepend("<li class=\"tweet\">" +
        "<img class=\"avatar\" src=\"" + tweet.avatar_url + "\" alt=\"\">" +
        "<div class=\"tweet-content\">" +
          "<p>" +
            "<span class=\"full-name\">" + tweet.username + "</span>" +
            "<span class=\"username\">" + tweet.handle + "</span>" +
            "<span class=\"timestamp\"> - " +  minutesSinceTweet(tweet.updated_at) + "m</span>" +
          "</p>" +
          "<p>" + tweet.content + "</p>" +
        "</div>" +
      "</li>")
  })


  $("#new-tweet").val('');
}
