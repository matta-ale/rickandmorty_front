import Card from '../Card/Card';
import styles from './Cards.module.css'


export default function Cards(props) {
   const {onClose,characters} = props
   
   return ( 
      <div className = {styles.container}>
         {
            characters.map(char => {
               return (<Card 
                  key = {char.id} 
                  id = {char.id}
                  name = {char.name}
                  status = {char.status.toLowerCase()}
                  species = {char.species.toLowerCase()}
                  gender = {char.gender.toLowerCase()}
                  origin = {char.origin.name}
                  image = {char.image}
                  onClose={onClose}
                  />)
            })
         }
      </div>
   );
}
