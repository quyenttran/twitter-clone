$(document).ready(function(){
   $('body').find('ul').css("overflow", "scroll")
   $('#tweets-container').find('ul').css("height", "1000px")

  $.ajax({
    method: "GET",
    url: "/tweets/recent",
    dataType: "json"
  })

    .done(function(response){
      for(var i = 0; i < response.length; i++){
          var j = (i + 1)
          var createdAt = (new Date(response[i].created_at))
          var currentTime = Math.floor((Date.now() - (createdAt)) / 1000 / 60)

      $("#tweets-container").find("li:nth-child(" + j + ")").find(".full-name").text(response[i].username)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".username").text(response[i].handle)
      $("#tweets-container").find("li:nth-child(" + j + ")").find(".timestamp").text(currentTime + " min")
      $("#tweets-container").find("li:nth-child(" + j + ")").find("img").attr("src", response[i].avatar_url)
      $("#tweets-container").find("li:nth-child(" + j + ")").find("p:nth-child(2)").text(response[i].content)
        }
      for(var i = 11; i < response.length; i++) {
       $("#tweets-container").find('ul').append(("<li class='" + "hidden'>" + "<img class='avatar' src='" + response[i].avatar_url +  "' alt=''/> <div class='tweet-content'><p><span class='full-name'>" + response[i].username + "</span>" + "<span class='username'>" + response[i].handle + "</span> <span class='timestamp'>- " + currentTime + "m" + "</span> </p><p>" + response[i].content + "</p></div></li>" )).find('li').last().hide()
      }

    // function isScrolledIntoView(elem)
    //     {
    //         var docViewTop = $(window).scrollTop();
    //         var docViewBottom = docViewTop + $(window).height();

    //         var elemTop = $(elem).offset().top;
    //         var elemBottom = elemTop + $(elem).height();

    //         return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    //     }


    //     $(document).ready(function(){
    //          $('.tweet').each(function(){
    //             if(!isScrolledIntoView($(this))){
    //                 $(this).addClass('hidden');
    //             }
    //         });

    //     $(document).on('scroll', function(){
    //         $('.hidden').each(function(){
    //             if(isScrolledIntoView($(this))){
    //                 $(this).removeClass('hidden').css({ 'display' : 'none' }).fadeIn();
    //             }
    //         });
    //     });
    //     });

  $(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
       // var allTweets =  $.ajax({ method: "GET", url: "/tweets/recent", dataType: "json" })
       $('.hidden').show()
       // allTweets.done(function(response){
       }
    });


  })

  $("#tweet-form").on("submit", function(event){
    event.preventDefault()
    var data = $(this).find("#new-tweet").val()


    $.ajax({
      method: "POST",
      url: "/tweets",
      dataType: "json",
      data: {tweet: {content: data}}
    })
    .done(function(response){
      console.log(response)
      console.log($("#tweets-container").find("li").last)
      var avatarUrl = response.avatar_url.replace(" ", "+")
      console.log("avatar url", avatarUrl)
      var createdAt = (new Date(response.created_at))
      var currentTime = Math.floor((Date.now()- (createdAt))/1000/60)
      $("#tweets-container").find("ul").prepend("<li class='" + "tweet'>" + "<img class='avatar' src='" + avatarUrl +  "' alt=''/> <div class='tweet-content'><p><span class='full-name'>" + response.username + "</span>" + "<span class='username'>" + response.handle + "</span> <span class='timestamp'>- " + currentTime + "m" + "</span> </p><p>" + response.content + "</p></div></li>" )
      $("#tweets-container").find("ul").children().last().remove()
      $('#new-tweet').val("")
    })
  })
})


