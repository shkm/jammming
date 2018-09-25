const baseUri = 'https://api.spotify.com/v1';
const clientId = 'CHANGE_ME';
const redirectUri = 'http://localhost:3000/';
const scopes = 'playlist-modify-public';

let accessToken;

export const Spotify = {
  ensureAuthorized() {
    accessToken || this.getAccessToken() || this.authorize();
  },

  authorize() {
    const uri = 'https://accounts.spotify.com/authorize?' +
                'response_type=token&' +
                `client_id=${clientId}&` +
                `scope=${scopes}&` +
                `redirect_uri=${redirectUri}`;

    window.location = uri;
  },

  // Grabs the access token from the current URL params,
  // and stores it.
  getAccessToken() {
    const pattern = new RegExp(/#access_token=([\w-]+)/);
    const matches = pattern.exec(window.location.hash);

    if (matches) {
      return accessToken = matches[1];
    }

    return;
  },

  search(name) {
    this.ensureAuthorized();

    const url = `${baseUri}/search?q=${name}&type=album,track,artist`;

    return fetch(url, { headers: this.defaultHeaders(accessToken) })
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name
          };
        });
      });
  },

  savePlaylist(name, tracks) {
    this.ensureAuthorized();

    return this.getUser()
      .then(user => this.createPlaylist(name, user))
      .then(playlist => this.addTracksToPlaylist(playlist, tracks));
  },

  getUser() {
    const url = `${baseUri}/me`;

    return fetch(url, { headers: this.defaultHeaders(accessToken) })
      .then(response => response.json())
  },


  createPlaylist(name, user) {
    const url = `${baseUri}/users/${user.id}/playlists`;

    return fetch(url, {
      headers: this.defaultHeaders(accessToken),
      method: 'POST',
      body: JSON.stringify({ name: name })
    })
      .then(response => response.json());
  },

  addTracksToPlaylist(playlist, tracks) {
    const url = `${baseUri}/playlists/${playlist.id}/tracks`;

    return fetch(url, {
      headers: this.defaultHeaders(accessToken),
      method: 'POST',
      body: JSON.stringify({
        uris: tracks.map(track => `spotify:track:${track.id}`)
      })
    });
  },

  defaultHeaders(accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
  }
};
