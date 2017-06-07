import React, { Component } from 'react';
import moment from 'moment';

class Tweet extends Component {
  render () {
    const tweet = this.props.tweet
    return (
      <li className="tweet">
        <img className="avatar" src={tweet.avatar_url} />
        <div className="tweet-content">
          <p>
            <span className="full-name">{tweet.username}</span>
            <span className="username"> {tweet.handle}</span>
            <span className="timestamp"> {moment(tweet.created_at).fromNow()}</span>
          </p>
          <p>{tweet.content}</p>
        </div>
      </li>
    )
      
  }
}

export default Tweet;
