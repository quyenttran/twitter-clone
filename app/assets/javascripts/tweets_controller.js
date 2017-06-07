$(document).ready(function(){
  var tweetForm = $("#tweet-form")
  var tweetRiver = $("#tweets-container").find("ul")
  var searchTweets = $("#search-form")

// POST new tweet data to server to create tweet
  tweetForm.on("submit", function(event){
    event.preventDefault();
    var $that = $(this);
    var tweet = new Tweet({content: $('#new-tweet').val()});
    var data = {tweet: {hashtag_names: tweet.hashtag_names, content: tweet.content}}
    $.ajax({
      method: 'post',
      url: '/tweets',
      dataType: 'JSON',
      data: data
    })
    // Prepend response to Tweet River
    .done(function(response){
      console.log(response)
      tweetRiver.prepend(response)
    });
  });


 //    // Prepend response to Tweet River
	// .done(function(response){
	//   console.log(response)
	//   tweetRiver.prepend(response)
	// });

	searchTweets.on("submit", function(event){
		event.preventDefault();
		var $that = $('#search').val();
		console.log($that)
		// var query = $that
		// console.log(query)
		$.ajax({
			method: 'get',
			url: "tweets/search/" + $that
			// dataType: 'JSON'
		})
		.done(function(response){
			console.log(response)
			tweetRiver.prepend(response)
		})
	})
});