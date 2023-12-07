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
            <p class="view-tweet-content-text"></p>
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
    $tweet.find('.view-tweet-content-text').text(tweetObj['content']['text'])

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
    

loadTweets();

const $form = $('#new-tweet-submission-form');

$form.on('submit', (event) => {
  //Browser will not sbutmit the form 
  event.preventDefault();
  
  const formTweet = $form.serialize();
  const formTweetArray = $form.serializeArray();
  const characterLength = formTweetArray[0].value
  if(characterLength.length <  1) {
     $('.err-no-text').text('Uh please write something first??? Thx.');
     $('.err-no-text').addClass('wiggle-animation');
    return;
  }
  
  if(characterLength.length >  140) {
    $('.err-to-much-text').text('K... why u write a novel? Only 140 chracters plz.');
    $('.err-to-much-text').addClass('wiggle-animation');
    return;
  }

  

  
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: formTweet,
    success: () => {
      loadTweets();
      $('#new-tweet-submission-form').get(0).reset()
      $('#max-count').text(140)
      
      
    }
  })
})


 
});





