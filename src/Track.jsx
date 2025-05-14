import styles from './styles/Track.module.css'


export default function Track ({trackItem, onAdd}) {
    return (
        <>
            <div className={styles.track}>
                <div className={styles.trackBody}>
                    <h3>{trackItem.name}</h3>
                    <span>{trackItem.artist}</span><br />
                    <span>{trackItem.album}</span>
                </div>
                <div className={styles.trackButton}>
                    <button onClick={onAdd} value={trackItem.id}>+</button>
                </div>
            </div>
        </>
    )
}