
var HashtagsViews = function() {}

HashtagsViews.prototype.renderHashtag = function(tag){
  var span = "<span style='color: grey'> &#128038; " + tag.hashtag_count + "| </span>"
  var search_path = '/tweets/search/' + tag.name
  var link = "<a class='trend' href='" + search_path + "'>" + tag.name + "</a>"
  var listItem = "<li>" + span + link + "</li>"
  return listItem
}
