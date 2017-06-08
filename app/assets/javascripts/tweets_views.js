// Render tweet in HTML

var TweetsViews = function(){}

TweetsViews.prototype.renderTweet = function(tweet){
  return "<li class='tweet'><img class='avatar' src=" + tweet.avatar_url + "><div class='tweet-content'><p><span class='full-name'>" + tweet.username + "</span><span class='username'>" + tweet.handle + "</span><span class='timestamp'> " + this.timeSinceTweet(tweet) + "</span></p><p>" + this.removeHashtags(tweet.content) + this.stringifyHashTags(tweet) + "</p></div></li>"
}

TweetsViews.prototype.stringifyHashTags = function(tweet){
  var hashTagsString = ""
  tweet.hashtag_names.forEach(function(hashTag){
    hashTagsString = hashTagsString + "<a class='hash-tag' href='" + "/tweets/search/" + hashTag + "'>" + " #" + hashTag + "</a>";
  })
  return hashTagsString
}

TweetsViews.prototype.timeSinceTweet = function(tweet) {
  return moment(tweet.created_at).fromNow();
}

TweetsViews.prototype.removeHashtags = function(content) {
  var matches = content.match(/\B#\w*[a-zA-Z]+\w*/g) || []
  var hashtags = matches.join(" ")
  var newContent = content.replace(hashtags, " ")
  return newContent
}

TweetsViews.prototype.scrollView = function() {
  // size_li = $tweetRiver.find("li").size();
  // x=10;
  // $tweetRiver.find("li:lt("+x+")").show();
  $("#myList li").css("display", "none")

  var size_li = $("#myList li").size();
  var x=8;
  $('#myList li:lt('+x+')').show();

  $("body").on("click", ".view-more", function(){
    x= (x+3 <= size_li) ? x+3 : size_li;
    $('#myList li:lt('+x+')').fadeIn();
  })

  $(window).scroll(function() {
    if (document.body.scrollTop >= (document.body.scrollHeight - window.innerHeight - 50)) {
      x= (x+3 <= size_li) ? x+3 : size_li;
      $('#myList li:lt('+x+')').fadeIn();
    }
  })
}
