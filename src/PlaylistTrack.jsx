import { useState } from "react";
import styles from './styles/Track.module.css'


export default function PlaylistTrack ({trackItem, onRemove}) {
    return (
        <>
            <div className={styles.track}>
                <div className={styles.trackBody}>
                    <h3>{trackItem.name}</h3>
                    <span>{trackItem.artist}</span><br />
                    <span>{trackItem.album}</span>
                </div>
                <div className={styles.trackButton}>
                    <button onClick={onRemove} value={trackItem.id}>-</button>
                </div>
            </div>
        </>
    )
}