import React, { Component } from 'react';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = { name: 'New Playlist' };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleSavePlaylist() {
    this.props.saveToSpotify(this.state.name);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.state.name}
               onChange={this.handleChangeName} />
        <TrackList tracks={this.props.tracks}
                   trackAction={this.props.trackAction}
                   trackActionContent="-" />
        <a onClick={this.handleSavePlaylist}
           className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
