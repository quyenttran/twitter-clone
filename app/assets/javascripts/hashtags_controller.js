$(document).ready(function() {
  showAllHashtags();
})

function fetchHashtags() {
  var requestPromise = $.ajax({
    url: "/hashtags/popular",
    method: "GET",
  });
  return requestPromise;
}

function renderHashtag(hashtag) {
  return "<li>" + hashtag.hashtag_count + "| " + hashtag.name + "</li>"
}

function showAllHashtags() {
  var promiseFromAjax = fetchHashtags();
  console.log(promiseFromAjax);
  promiseFromAjax.done(function(response){
    response.forEach(function(hashtag) {
      $("#trends-container").find("ul").append(renderHashtag(hashtag));
    })
  })
}
