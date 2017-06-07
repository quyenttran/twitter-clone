$(document).ready(function() {
  $("#tweet-form").on("submit", function(e) {
    e.preventDefault()
    handleCreateTweet();
  })
})


function createTweet(newTweet, tags) {
  dataToSend = {"tweet": {"content": newTweet}, "hashtags": tags}
  var requestPromise = $.ajax({url: "/tweets", method: "POST", data: dataToSend});
  return requestPromise;
}

function handleCreateTweet() {
  var content = $("#new-tweet").val()
  var contentAndTags = content.split(" ")
  var tags = [];

  $.each(contentAndTags, function(i,val) {
    if (contentAndTags[i].indexOf("#") === 0){
      tags.push(contentAndTags[i].substring(1))
    }
  })

  var promiseFromAjax = createTweet(content, tags);
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
  }, 0, function() {
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
