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
      accessToken: this.getAccessToken(),
      foundTracks: [],
      playlistTracks: []
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
    this.savePlaylistToSpotify = this.savePlaylistToSpotify.bind(this);
  }

  // Grabs the access token from the current URL params.
  getAccessToken() {
    const pattern = new RegExp(/#access_token=([\w-]+)/);
    const matches = pattern.exec(window.location.hash);

    return matches ? matches[1] : null;
  }

  searchSpotify(term) {
    if (!this.state.accessToken) return Spotify.authorize();

    Spotify.search(this.state.accessToken, term)
      .then(tracks => this.setState({ foundTracks: tracks }));
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

  savePlaylistToSpotify(name) {
    if (!this.state.accessToken) return Spotify.authorize();

    this.withUserId(userId => {
      Spotify.createPlaylist(this.state.accessToken, userId, name)
        .then(playlist => {
          Spotify.addTracksToPlaylist(
            this.state.accessToken, playlist.id, this.state.playlistTracks
          );
        })
        .then(() => this.setState({ playlistTracks: [] }));
    });
  }

  // I initially tried to chain `retrieveUserId().then...` and use this.state.accessToken
  // but I seem to have lost `this` context, so I made that function return the ID
  // and I'm using this helper to conditionally pass it into the new function.
  // Thoughts on better ways?
  withUserId(func) {
    if (this.state.userId) {
      return func(this.state.userId);
    } else {
      return this.retrieveUserId().then(userId => func(userId));
    }
  }

  retrieveUserId() {
    return Spotify.user(this.state.accessToken)
      .then(user => {
        this.setState({ userId: user.id });
        return user.id;
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
