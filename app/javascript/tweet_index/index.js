import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Tweet from './tweet'
import TweetContainer from './tweet_container'
import HashtagContainer from './hashtag_container'
import NewTweetForm from './new_tweet_form'
import SearchForm from './search_form'
import {getFormValues, findHashTags, resetFormValues} from './form_utils'

class TweetIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recentTweets: [],
      popularHashtags: [],
      defaultVal: "",
      formError: false
    };
  }

  componentDidMount() {
    this.fetchTweets(); 
    this.fetchHashtags();
  } 

  findHashTags(content) {
    return content.split(" ").filter( (word) => {
      return word.startsWith("#")
    })
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

  fetchHashtag(hashtag) {
    fetch('/tweets/search/' + hashtag)
    .then((response) => {
      if(response.status !== 404){
        response.json().then((data) => {
          this.setState({recentTweets: data, formError: false})
        })
      } else {
        this.setState({formError: true})
      }
    })
    .catch((error) => {
      console.warn(error.status)
    })
  }

  postTweet(newTweet, hashTags) {
    let token = document.head.querySelector("[name=csrf-token]").content;

    fetch('tweets', {
      method: 'post',
      body: JSON.stringify({tweet: newTweet, hashtags: hashTags}),
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then((response) => {
      response.json().then((data) => {
        let tweets = [data, ...this.state.recentTweets]
        tweets.pop()
        this.setState({ 
          recentTweets: tweets
        })
      })
    })
    .catch((error) => {
      console.warn(error.status)
    })
  }

  handleSearchFormSubmit(event) {
    event.preventDefault();

    let inputs = event.target.getElementsByTagName("input")
    let formValues = getFormValues(event.target)
    this.fetchHashtag(formValues.query)
    resetFormValues(inputs)
  }

  handleNewFormSubmit(event) {
    event.preventDefault();

    let textarea = event.target.getElementsByTagName("textarea"); 
    let newTweet = getFormValues(event.target)
    let hashTags = findHashTags(newTweet.content)

    this.postTweet(newTweet, hashTags)
    resetFormValues(textarea)
  }

  handleHashtagLink(event) {
    event.preventDefault();
    const hashtag = event.target.innerHTML
    this.fetchHashtag(hashtag)
  }

  render () {
    return (
      <div>
        <header id="top-nav">
          <div id="brand">Lil' Twitter API</div>
          {<SearchForm 
              handleSearchFormSubmit={this.handleSearchFormSubmit.bind(this)} formError={this.state.formError}/>}
          <i className="fa fa-search"></i>
        </header>
        <section className="container">
          <section id="tweet-box">
            <p id="tweet-box-title">Compose New Tweet</p>
            {<NewTweetForm handleNewFormSubmit={this.handleNewFormSubmit.bind(this)} defaultVal={this.state.defaultVal}/>}
          </section>
          <section id="trends-container">
            <h3>Trends</h3>
            {<HashtagContainer popularHashtags={this.state.popularHashtags} handleHashtagLink={this.handleHashtagLink.bind(this)} />}
          </section>
          <section id="tweets-container">
            <h3>Tweets</h3> 
            {<TweetContainer recentTweets={this.state.recentTweets}/>}
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
