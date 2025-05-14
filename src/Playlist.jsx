import styles from './styles/Playlist.module.css'
import PlaylistTrack from './PlaylistTrack'


export default function Playlist ({playlistItems, onRemoveFromPlaylist, playlistName, onNamePlaylist, onSendPlaylist}) {
    return (
        <>
            <div className={styles.playlistDiv}>
                <form action="" id='playlist' onSubmit={onSendPlaylist}>
                    <label htmlFor="playlistName"></label>
                    <input className={styles.playlistInput} type="text" id='playlistName' onChange={onNamePlaylist} value={playlistName} placeholder='Enter the Name of Your Playlist'/>
                    {playlistItems.map(item=> <PlaylistTrack trackItem={item} key={item.id} onRemove={onRemoveFromPlaylist}/>)}
                </form>
                <button form='playlist'>Send To Spotify</button>
            </div>
        </>
    )
}