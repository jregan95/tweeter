/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1701719343033
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1701805743033
    }
  ]


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

 renderTweets(tweetData);
  

 
});





