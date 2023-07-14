import styles from './SearchBar.module.css'
import { useState } from 'react';

export default function SearchBar(props) {
   const {onSearch, randomNum} = props
   const [id,setId] = useState('')

   const handleChange = (e) => {
      setId(e.target.value)
   }
   return (
      <div className={styles.searchBarContainer}>   
         <div className = {styles.searchBarDiv}>
            <input type='search' placeholder='Enter id (1 - 826)'className={styles.inputBar} onChange={handleChange} value={id}/>
            <button onClick={() => onSearch(id)} className={styles.addButton}>Add card</button>
            <button onClick={randomNum} className={styles.addButton}>Random card</button>
         </div>
      </div>
   );
}
