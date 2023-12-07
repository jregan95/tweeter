/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //Set variable called $tweetContainer to equal the HTML ID of tweet-container
  const $tweetContainer = $('#tweet-container');

  /*This function creates the HTML for the tweet articles by pulling the data from the
  tweet database*/
  const createTweetElement = function(tweetObj) {

    //$tweet equals the modified HTML text based on values from tweet object provided
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

    //Finds the class of view-tweet-content-text to plug in HTML text to avoid hacking
    $tweet.find('.view-tweet-content-text').text(tweetObj['content']['text']);

    return $tweet;
  } 

  //This function renders the new display of tweets on the main page
  const renderTweets = function(tweetsArray) {

    /*Clears our tweet container out before rendering new tweets page. This is required
    or tweet container will duplicate itself every form submit. */
    $tweetContainer.empty();
    
    /*Loops through thr tweet database and calls the createTweetElement on each tweet
    providing a new article for each one*/
    for(const tweet of tweetsArray) {
      const $tweet = createTweetElement(tweet);
      //Use prepend to push newest tweets to beggining of page
      $tweetContainer.prepend($tweet);
    }
    
  }

  /*This function uses AJAX to call a GET on the/tweets page and if successful calls
  the renderTweets to */
  const loadTweets = function() {$.ajax({
    method: 'GET',
    url:'/tweets',
    success: (tweets) => {
      renderTweets(tweets);
    }
  })
  }
    
  //Call load tweets
  loadTweets();

  //Declaring the $form globally as the HTML ID new-tweet-submission-form
  const $form = $('#new-tweet-submission-form');

  //Uses JQuery to listen for the submit form event 
  $form.on('submit', (event) => {

    //Browser will not submit and refresh page
    event.preventDefault();
  
    /*Declares formTweet variable which is the serialized data of the new 
    tweet submission*/
    const formTweet = $form.serialize();

    /*This serializes the data into an array of objects ex: 
    [0: {name: text, value: users tweet}] */
    const formTweetArray = $form.serializeArray();

    /*Gets the length of the value key in the which will be the amount of characters
    user has inputted in their tweet submission*/
    const characterLength = formTweetArray[0].value.length;

    /*If the character length is less than 1 it will print the provided
    error message*/
    if(characterLength <  1) {
      $('.err-no-text').text('Uh please write something first??? Thx.');
      /*It also addes a class to the error message so appropriate CSS stylings
      will ne applied which are delcared in new-tweet.css*/
      $('.err-no-text').addClass('wiggle-animation');
      return;
    }

    /*If the character length is greater than 140 it will print the provided
    error message and a class attribute*/
    if(characterLength >  140) {
      $('.err-to-much-text').text('K... why u write a novel? Only 140 chracters plz.');
      $('.err-to-much-text').addClass('wiggle-animation');
      return;
    }

    /*Uses AJAX to post the users new tweet to the tweets database and then will
    call the loadTweets function which will load all the tweets in the database
    on the users main page*/
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formTweet,
      success: () => {
        loadTweets();
        //This resets the tweet submit from so users posted tweet is no longer there
        $('#new-tweet-submission-form').get(0).reset()
        //This resets the character count back to 140
        $('#max-count').text(140)   
      }
    });
  });
 
});





