/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {




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
            <span>${tweetObj['created_at']}</span>
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
    for(const tweet of tweetsArray) {
      const $tweet = createTweetElement(tweet);
      const $tweetContainer = $('#tweet-container')
      $tweetContainer.prepend($tweet)
    }
  }

 
  
 const getTweets = function() {$.ajax({
    method: 'GET',
    url:'/tweets',
    success: (tweets) => {
      renderTweets(tweets);
    }
  })
}

getTweets();
 
});





