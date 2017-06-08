import React, { Component } from 'react';

const Hashtag = ({tag, handleHashtagLink}) => (

  <a href={tag.name} onClick={handleHashtagLink}>
    <li className="hashtag" >
      {tag.name}
    </li>
  </a>
)

export default Hashtag;
