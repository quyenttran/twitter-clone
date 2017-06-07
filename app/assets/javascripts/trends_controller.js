$(document).ready(function(){
  var $trendsListItems = $('#trends-container').find('li')
  $('#trends-container').on('click', 'li', function(event){
    var tag = $(this).text()
    handleTweetsWithHashtag(tag)
  })
})

function handleTweetsWithHashtag(tag){
  var promiseFromAjax = fetchTweetsWithTag(tag);
  promiseFromAjax.done(function(matchedTweetsData){
    showTweetsWithTag(matchedTweetsData)
  })
}
