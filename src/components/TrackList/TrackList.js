import React, { Component } from 'react';
import { Track } from '../Track/Track';

export class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track key={track.id}
                          track={track}
                          trackAction={this.props.trackAction}
                          actionContent={this.props.trackActionContent}/>
          })
        }
      </div>
    );
  }
}
