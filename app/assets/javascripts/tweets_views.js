// Render tweet in HTML

var TweetsViews = function(){}

TweetsViews.prototype.renderTweet = function(tweet){
  return "<li class='tweet'><img class='avatar' src=" + tweet.avatar_url + "><div class='tweet-content'><p><span class='full-name'>" + tweet.username + "</span><span class='username'>" + tweet.handle + "</span><span class='timestamp'> " + this.timeSinceTweet(tweet) + "</span></p><p>" + tweet.content + this.stringifyHashTags(tweet) + "</p></div></li>"
}

TweetsViews.prototype.stringifyHashTags = function(tweet){
  var hashTagsString = ""
  tweet.hashtag_names.forEach(function(hashTag){
    hashTagsString = hashTagsString + " #" + hashTag;
  })
  return hashTagsString
}

TweetsViews.prototype.timeSinceTweet = function(tweet) {
  return moment(tweet.created_at).fromNow();
}
