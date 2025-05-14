import { useState } from "react";
import styles from './styles/SearchBar.module.css'

export default function SearchBar({searchTerm, onSearch, onSendSearch, onClearSearch}) {
   return (
    <>
    <div className={styles.search}>
    <form action='' id='search' onSubmit={onSendSearch}>
        <label htmlFor='searchTerm'></label>
        <input id='searchTerm' type='text' onChange={onSearch} value={searchTerm} placeholder="Search by Artist"/>
    </form>
    <button form="search">Search</button>
    <button form="search" type="button" onClick={onClearSearch}>Clear</button>
    </div>
    </>
   )
}