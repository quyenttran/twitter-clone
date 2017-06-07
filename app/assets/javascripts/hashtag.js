$(document).ready(function() {
  controllerPopularTags();
})

function fetchPopularTags() {
  var requestPromise = $.ajax({url:"/hashtags/popular", method:"GET"});
  return requestPromise;
}

function controllerPopularTags() {
  console.log("reached")
  var promiseFromAjax = fetchPopularTags();
  console.log(promiseFromAjax)
  promiseFromAjax.done(function(tags) {
    console.log(tags)
    showPopularTags(tags);
  })
}

function showPopularTags(tags) {
  $("#trends-container > ul").empty()
  for (var i = 0; i < tags.length; i++) {
    console.log(tags[i].name)
    $("#trends-container > ul").append("<li>" + tags[i].name + "</li>")
  }
}
