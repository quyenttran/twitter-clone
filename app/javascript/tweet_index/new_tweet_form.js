import React, { Component } from 'react';

class NewTweetForm extends Component { 

  render() {
    return (
      <form id="tweet-form" onSubmit={this.props.handleNewFormSubmit}>
        <textarea id="new-tweet" cols="30" rows="5" maxLength="140" name="tweet"></textarea>
        <input type="submit" value="Tweet" />
      </form>
    );
  }
}

export default NewTweetForm;
