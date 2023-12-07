/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() {
  const $tweetContainer = $('#tweet-container')

  

   const createTweetElement = function(tweetObj) {
    const $tweet = $(
      `<article class="view-tweet">
        <header class="view-tweet-header">
          <div class="header-left">
            <img class="picture" src="${tweetObj['user']['avatars']}">
            <span class ='view-tweet-name'>${tweetObj['user']['name']}</span>
          </div>
            <span>${tweetObj['user']['handle']}</span>
        </header>
          <div class="view-tweet-content">
            <p class="view-tweet-content-text">${tweetObj['content']['text']}</p>
          </div>
        <footer class="view-tweet-footer">
          <div>
            <span class='time'>${timeago.format(tweetObj['created_at'])}</span>
          </div>
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`
    );

    return $tweet

  } 

  const renderTweets = function(tweetsArray) {
    $tweetContainer.empty();
    for(const tweet of tweetsArray) {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet)
    }
    
  }

  const loadTweets = function() {$.ajax({
    method: 'GET',
    url:'/tweets',
    success: (tweets) => {
      renderTweets(tweets);
    }
  })
  }
    
console.log('line 63')
loadTweets();

const $form = $('#new-tweet-submission-form');

$form.on('submit', (event) => {
  //Browser will not sbutmit the form 
  event.preventDefault();
  
  const formTweet = $form.serialize();
  const formTweetArray = $form.serializeArray();
  const characterLength = formTweetArray[0].value
  if(characterLength.length <  1) {
    return alert('Uhhh... you need to actually type something');
  }
  if(characterLength.length >  140) {
    return alert("Less wordz plz. K thx.")
  }

  

  
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: formTweet,
    success: () => {
      loadTweets();
    }
  })
})


 
});





