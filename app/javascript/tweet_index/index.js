import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Tweet from './tweet'
import TweetRiver from './tweet_river'
import HashtagContainer from './hashtag_container'
import NewTweetForm from './new_tweet_form'

class TweetIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recentTweets: [],
      popularHashtags: []
    };
  }

  componentDidMount() {
    this.fetchTweets(); 
    this.fetchHashtags();
  } 

  getFormValues(targetedForm) {
    var kvpairs = {};
    var form = targetedForm
    for ( var i = 0; i < form.elements.length; i++ ) {
      var e = form.elements[i];
      if(e.name){
        kvpairs[e.name] = e.value;
      }
    }
    return kvpairs;
  }

  fetchTweets() {
    fetch('/tweets/recent')
    .then((response) => {
      response.json().then((data) => {
        this.setState({recentTweets: data})
      })
    })
  }

  fetchHashtags() {
    fetch('/hashtags/popular')
    .then((response) => {
      response.json().then((data) => {
        this.setState({popularHashtags: data})
      })
    })
  }

  postTweet(newTweet) {
    let token = document.head.querySelector("[name=csrf-token]").content;

    fetch('tweets', {
      method: 'post',
      body: JSON.stringify({tweet: newTweet}),
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => {
      response.json().then((data) => {
        let tweets = [data, ...this.state.recentTweets]
        this.setState({ 
          showForm: false,
          recentTweets: tweets
        })
      })
    })
  }

  handleNewFormSubmit(event) {
    event.preventDefault();

    let newTweet = this.getFormValues(event.target)
    this.postTweet(newTweet)
  }

  render () {
    return (
      <div>
        <header id="top-nav">
          <div id="brand">Lil' Twitter API</div>
          <form id="search-form">
            <input id="search" type="text" name="query" />
          </form>
          <i className="fa fa-search"></i>
        </header>
        <section className="container">
          <section id="tweet-box">
            <p id="tweet-box-title">Compose New Tweet</p>
            {<NewTweetForm handleNewFormSubmit={this.handleNewFormSubmit.bind(this)}/>}
          </section>
          <section id="trends-container">
            <h3>Trends</h3>
            {<HashtagContainer popularHashtags={this.state.popularHashtags} />}
          </section>
          <section id="tweets-container">
            <h3>Tweets</h3> 
            {<TweetRiver recentTweets={this.state.recentTweets}/>}
          </section>
        </section>

      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TweetIndex name="TweetIndex" />,
    document.getElementById("tweets-index-container"),
  )
})
