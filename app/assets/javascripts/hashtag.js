$(document).ready(function() {
  controllerPopularTags();
})

function fetchPopularTags() {
  var requestPromise = $.ajax({url:"/hashtags/popular", method:"GET"});
  return requestPromise;
}

function controllerPopularTags() {
  var promiseFromAjax = fetchPopularTags();
  promiseFromAjax.done(function(tags) {
    showPopularTags(tags);
  })
}

function showPopularTags(tags) {
  $("#trends-container > ul").empty()
  for (var i = 0; i < tags.length; i++) {
    $("#trends-container > ul").append("<li>" + tags[i].name + "</li>")
  }
}
