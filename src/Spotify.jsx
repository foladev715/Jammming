import { generateCodeVerifier, generateCodeChallenge } from './pkce';

const clientId = 'e8137ed92b12456ea547793c22d1d5bd';
const redirectUri = 'https://de55-2607-fea8-3522-bc00-9879-7f13-2539-a9d2.ngrok-free.app/';
const scopes = 'playlist-modify-public';

let accessToken;

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      const codeVerifier = generateCodeVerifier();
      localStorage.setItem('code_verifier', codeVerifier);

      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

      window.location = authUrl;
      return;
    }

    // If 'code' is in the URL, exchange it for an access token
    const codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    });

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const data = await response.json();
    accessToken = data.access_token;

    // Clean up URL
    window.history.replaceState({}, document.title, '/');

    return accessToken;
  },

  async search(term) {
  const token = await this.getAccessToken();
  if (!token) return null; // Return null if redirected for auth

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) return [];

    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, trackUris) {
  if (!name || !trackUris.length) return;

  const accessToken = await this.getAccessToken();
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    // Step 1: Get user ID
    const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Step 2: Create playlist
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: 'Created with Jammming',
        public: true
      })
    });

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Step 3: Add tracks
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uris: trackUris
      })
    });

    alert("Playlist saved to your Spotify!");
  } catch (error) {
    console.error('Failed to save playlist:', error);
  }
  }
};

export default Spotify;
