$(document).ready(function(){

  var $tweetForm = $("#tweet-form")
  var $tweetRiver = $("#tweets-container").find("ul")
  var $searchTweets = $("#search-form")
  var $tweetFormBody = $('#new-tweet')

// Create TweetsViews object
  var tweetsViews = new TweetsViews

// Declare prevResponse variable for long polling
  var prevResponse

// POST new tweet data to server to create tweet
  $tweetForm.on("submit", function(event){
    event.preventDefault();
    var $that = $(this);
    var tweet = new Tweet({content: $tweetFormBody.val()});
    var data = {tweet: {content: tweet.content}, hashtags: tweet.hashtag_names}
    $.ajax({
      method: 'post',
      url: '/tweets',
      dataType: 'JSON',
      data: data
    })
    // Prepend response to Tweet River
    .done(function(response){
      $tweetRiver.prepend(tweetsViews.renderTweet(response)).children().first().hide().fadeIn(200)
      // Remove oldest tweet in Tweet River
      $tweetRiver.children().last().remove()
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
    // Append each tweet
    response.forEach(function(tweet){
      $tweetRiver.append(tweetsViews.renderTweet(tweet));
    })
    // Assign prevResponse to response to set up long polling
    // prevResponse = response
  });


	$searchTweets.on("submit", function(event){
		event.preventDefault();
		var $that = $(this)
		var query = $('#search').val();
		$.ajax({
			method: 'get',
			url: "tweets/search/" + query
		})
		.done(function(response){
			$tweetRiver.html("")
	    	response.forEach(function(tweet){
	      	$tweetRiver.append(tweetsViews.renderTweet(tweet));
	      	$('#search').css('background-color', 'white')
	    	})
    	})
    	.fail(function(response){
    		$('#search').css('background-color', 'pink')
    	})
	})

  // Long polling for new tweets
  var pollForNewTweets = function(){
    var getRecentTweets = function(){
    var ajaxRequest = $.ajax({
      url: '/tweets/recent',
      dataType: "json",
      success: function(response){
        if (response[0].created_at !== prevResponse[0].created_at) {
          $("#tweets-container").find("h3").append("<p style='text-align: center; border-radius: 5px; color: white; border: solid 1px grey; padding: 10px 0; margin: 10px 20px 10px 10px; background-color: grey;''><a href='/'>New tweets are available. Click to reload.</p>")
          prevResponse = response
        }
      },
      })
    };
    setInterval(getRecentTweets, 5000)
  }
  // Commented out longpolling call, because it's bad.
  // pollForNewTweets()

});
