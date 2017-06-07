// model for recent tweets
function requestRecent() {
  var request = $.ajax({
      method: 'get',
      url: '/tweets/recent'
  });
  return request
}

// model for popular hashtags
function requestPopular() {
  var request = $.ajax({
      method: 'get',
      url: '/hashtags/popular'
  });
  return request
}

// view time helper method
function timeSince(timeString) {
  var now = moment(new Date())
  var then = moment(timeString)
  var time = moment.duration(now.diff(then)).minutes()
  return time
}

$(document).ready(function(event) {
  var tweet = $(".tweet")
  var hashtag = $("#trends-container")

  // views for recent
  function displayAvatar(url, i) {
    tweet.eq(i).find(".avatar").attr('src', url)
  }
  function displayFullName(username, i) {
    tweet.eq(i).find(".full-name").text(username)
  }
  function displayUsername(handle, i) {
    tweet.eq(i).find(".username").text(handle)
  }
  function displayTimestamp(timestamp, i) {
    tweet.eq(i).find(".timestamp").text(timeSince(timestamp) +" minutes ago")
  }
  function displayContent(content, i) {
    tweet.eq(i).find(".tweet-content").find("p").first().next().text(content)
  }
  function displayTweet(tweet, i) {
    displayAvatar(tweet.avatar_url, i)
    displayFullName(tweet.username, i)
    displayUsername(tweet.handle, i)
    displayTimestamp(tweet.created_at, i)
    displayContent(tweet.content, i)
  }

  // view for popular
  function displayHashtag(htag, i) {
    console.log("test")
    hashtag.find("ul").find("li").eq(i).text("#"+htag.name)
  }

  // controller for recent
  function controlRecent(recentTweets) {
    recentTweets.done(function(response){
      for(var i=0; i<response.length; i++) {
        displayTweet(response[i], i)
      }
    })
  }

  // controller for popular
  function controlPopular(popularHashtags) {
    popularHashtags.done(function(response){
      for(var i=0; i<response.length; i++) {
        displayHashtag(response[i], i)
      }
    })
  }

  controlRecent(requestRecent());
  controlPopular(requestPopular());
})
