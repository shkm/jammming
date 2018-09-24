import React, { Component } from 'react';

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value });
  }

  handleSearch(event) {
    this.props.searchSpotify(this.state.term);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={ this.handleSearch } className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={ this.handleTermChange }/>
        <a onClick={ this.handleSearch }>SEARCH</a>
      </form>
    );
  }
}
