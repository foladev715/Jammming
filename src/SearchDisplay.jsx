import styles from './styles/SearchDisplay.module.css'
import Track from './Track'

export default function SearchDisplay({searchItems, searchBox, onAddToPlaylist}) {
    return (
        <>
            <div className={styles.resultsDiv}>
                {searchBox && <p>{searchBox}</p>}
                {searchItems.map(item=> <Track trackItem={item} key={item.id} onAdd={onAddToPlaylist}/>)}
            </div>
        </>
    )

}