import React, { Component } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';
import { Spotify } from './util/Spotify.js';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundTracks: [],
      playlistTracks: []
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
    this.savePlaylistToSpotify = this.savePlaylistToSpotify.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term)
      .then(tracks => this.setState({ foundTracks: tracks }));
  }

  savePlaylistToSpotify(name) {
    Spotify.savePlaylist(name, this.state.playlistTracks)
      .then(() => this.setState({ playlistTracks: [] }));
  }

  addTrackToPlaylist(track) {
    if (this.state.playlistTracks.includes(track)) return;

    this.setState({ playlistTracks: [ track, ...this.state.playlistTracks ]});
  }

  removeTrackFromPlaylist(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => {
        return playlistTrack !== track;
      })
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar searchSpotify={this.searchSpotify}/>
        <div className="App-playlist">
          <SearchResults tracks={this.state.foundTracks} trackAction={this.addTrackToPlaylist}/>
          <Playlist tracks={this.state.playlistTracks }
                    trackAction={this.removeTrackFromPlaylist}
                    saveToSpotify={this.savePlaylistToSpotify} />
        </div>
      </div>
    );
  }
}
