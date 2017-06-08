$(document).ready(function() {
  showAllHashtags();

  $("#trends-container").on("click", ".trend", function(event) {
    event.preventDefault();
    var hashtag = $(this).text();
    showSearchedTweets(hashtag);
  })
})

function fetchHashtags() {
  var requestPromise = $.ajax({
    url: "/hashtags/popular",
    method: "GET",
  });
  return requestPromise;
}

function renderHashtag(hashtag) {
  return "<li><a href='/tweets/search/" + hashtag.name + "' class='trend'>" + hashtag.name + "</a> (" + hashtag.hashtag_count +")</li>"
}

function showAllHashtags() {
  var promiseFromAjax = fetchHashtags();
  promiseFromAjax.done(function(response){
    response.forEach(function(hashtag) {
      $("#trends-container").find("ul").append(renderHashtag(hashtag));
    })
  })
}


