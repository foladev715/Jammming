import { useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import SearchDisplay from './SearchDisplay'
import Playlist from './Playlist'
import Footer from './Footer'
import { tracks } from './TrackData'
import Spotify from './Spotify';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchBox, setSearchBox] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('');

  const searchHandler = e => {
    setSearchTerm(e.target.value);
  }

  const addToPlaylistHandler = e => {
    e.preventDefault(); 
    const { value } = e.target;
    const track = searchResult.find(track=> track.id === value)
    setPlaylist(prev=>([...prev, track]))
  }
  
  const removeFromPlaylistHandler = e => {
    e.preventDefault();
    const { value } = e.target;
    setPlaylist(prev=> prev.filter(track=> track.id !== value))
  }
  
  const namePlaylistHandler = e => {
    const { value } = e.target;
    setPlaylistName(value)
  }

  // const sendSearchHandler = (e) => {
  //   e.preventDefault(); 
  //   const result = tracks.filter(track => track.artist.toLowerCase().startsWith(searchTerm.toLowerCase()));
  //   if (searchTerm){
  //     if (result.length > 0) {
  //       setSearchResult(result);
  //       setSearchBox('');
  //     } else {
  //       setSearchBox('No Track Found');
  //       setSearchResult([]);
  //     }
  //   } else {
  //     setSearchBox('Enter A Valid Search Term')
  //     setSearchResult([]);
  //   }
  // }

const sendSearchHandler = (e) => {
e.preventDefault();

  if (!searchTerm.trim()) {
    setSearchBox('Enter A Valid Search Term');
    setSearchResult([]);
    return;
  }

  Spotify.search(searchTerm)
    .then(results => {
  if (results === null) {
    // We just redirected, do nothing
    return;
  }
      if (results.length > 0) {
        setSearchResult(results);
        setSearchBox('');
      } else {
        setSearchBox('No Track Found');
        setSearchResult([]);
      }
    })
    .catch(error => {
      console.error('Error fetching from Spotify:', error);
      setSearchBox('Something went wrong while searching.');
      setSearchResult([]);
    });
};

  const clearSearchHandler = e => {
    e.preventDefault();
    setSearchTerm('');
    setSearchResult([]);
    setPlaylist([]);
    setSearchBox('');
  }

  // const sendPlaylistHandler = e => {
  //   e.preventDefault();
  //   const uriArr = [];
  //   for(let i = 0; i < playlist.length; i++) {
  //     uriArr.push(playlist[i].uri);
  //   }
  //   console.log(playlistName);
  //   console.log(uriArr);
  //   setPlaylist([]);
  //   setPlaylistName('');
  // }

  const sendPlaylistHandler = async e => {
  e.preventDefault();

  if (!playlistName || playlist.length === 0) {
    alert("Please enter a playlist name and add at least one track.");
    return;
  }

  const uriArr = playlist.map(track => track.uri);

  try {
    await Spotify.savePlaylist(playlistName, uriArr);
    alert("Playlist successfully saved to your Spotify!");
    
    // Clear playlist and name after saving
    setPlaylist([]);
    setPlaylistName('');
  } catch (error) {
    console.error("Error saving playlist:", error);
    alert("Something went wrong while saving the playlist.");
  }
};


  return (
    <>
    <div className='header'>
    <NavBar />
    </div>
    <div className='main'>
    <SearchBar searchTerm={searchTerm} onSearch={searchHandler} onSendSearch={sendSearchHandler} onClearSearch={clearSearchHandler}/>
      <div className='musicLists'>
      <SearchDisplay searchItems={searchResult} searchBox={searchBox} searchTerm={searchTerm} onAddToPlaylist={addToPlaylistHandler}/>
      <Playlist playlistItems={playlist} onRemoveFromPlaylist={removeFromPlaylistHandler} playlistName={playlistName} onNamePlaylist={namePlaylistHandler} onSendPlaylist={sendPlaylistHandler}/>
      </div>  
    </div>
    <div className='footer'>
      <Footer />
    </div>
    </>
  )
}

export default App
