import React, { Component } from 'react';
import Hashtag from './hashtag';

class HashtagContainer extends Component {

  renderTags() {
    return this.props.popularHashtags.map( (tag, index) => 
      <Hashtag key={index} tag={tag}/>
    )
  }

  render() {
    return (
      <ul>
        {this.renderTags()}
      </ul>
    )
  } 
}

export default HashtagContainer
