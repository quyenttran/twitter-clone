$(document).ready(function(){
  $('#trends-container').on('click', 'li', function(event){
    var tag = $(this).text()
    handleTweetsWithHashtag(tag)
    $(window).unbind("scroll");
  })
})

function handleTweetsWithHashtag(tag){
  var promiseFromAjax = fetchTweetsWithTag(tag);
  promiseFromAjax.done(function(matchedTweetsData){
    showTweetsWithTag(matchedTweetsData)
  })
}
