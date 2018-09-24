import React, { Component } from 'react';
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={ this.props.tracks }
                   trackAction={this.props.trackAction}
                   trackActionContent="+" />
      </div>
    );
  }
}
