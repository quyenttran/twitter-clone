import React, { Component } from 'react';

class SearchForm extends Component { 
  inputStyle() {
    if(this.props.formError){
      return {border: "2px solid red"}
    }
  }

  render() {
    return (
      <form id="search-form" onSubmit={this.props.handleSearchFormSubmit}>
        <input id="search" type="text" name="query" style={this.inputStyle()} />
      </form>
    );
  }
}

export default SearchForm;
