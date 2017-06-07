import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Tweet from './tweet'
class TweetRiver extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      recentTweets: [],
    };
  }
  
  componentDidMount() {
    this.fetchTweets(); 
  } 

  renderRecent() {
    return this.state.recentTweets.map( (tweet, index) => 
      <Tweet key={index} tweet={tweet}/>
    )
  }
  
  fetchTweets() {
    fetch('/tweets/recent')
    .then((response) => {
      response.json().then((data) => {
        this.setState({recentTweets: data})
      })
    })
  }


  render () {
    return (
      <div>
        <h3>Tweets</h3> 
        <ul>
          {this.renderRecent()}
        </ul>
      </div>
    )
      
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TweetRiver name="TweetRiver" />,
    document.getElementById("tweets-container"),
  )
})
