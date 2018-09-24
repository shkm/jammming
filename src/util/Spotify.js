const baseUri = 'https://api.spotify.com/v1';
const clientId = 'CHANGE_ME';
const redirectUri = 'http://localhost:3000/';
const scopes = ('playlist-modify-public');

export const Spotify = {
  authorize() {
    const uri = 'https://accounts.spotify.com/authorize?' +
                'response_type=token&' +
                `client_id=${clientId}&` +
                `scope=${scopes}&` +
                `redirect_uri=${redirectUri}`;

    window.location = uri;
  },

  search(accessToken, name) {
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

  user(accessToken) {
    const url = `${baseUri}/me`;

    return fetch(url, { headers: this.defaultHeaders(accessToken) })
      .then(response => response.json());
  },

  createPlaylist(accessToken, userId, name) {
    const url = `${baseUri}/users/${userId}/playlists`;

    return fetch(url, {
      headers: this.defaultHeaders(accessToken),
      method: 'POST',
      body: JSON.stringify({ name: name })
    })
      .then(response => response.json());
  },

  addTracksToPlaylist(accessToken, playlistId, tracks) {
    const url = `${baseUri}/playlists/${playlistId}/tracks`;

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
