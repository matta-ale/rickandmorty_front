import styles from './Card.module.css';
import { useLocation, useNavigate} from 'react-router-dom';
import { ROUTES } from '../../Helpers/PathRouters';
import { addFav, removeFav } from '../../redux/actions';
import { connect ,useSelector} from 'react-redux';
import { useState , useEffect} from 'react';

function Card(props) {
  const { id, name, status, species, gender, origin, image, onClose,addFav,removeFav} = props;
  const [isFav, setIsFav] = useState(false);
  const [ripples, setRipples] = useState(null);
  const location = useLocation()
  const navigate = useNavigate();
  const myFavorites = useSelector((state) => (location.pathname === ROUTES.FAVORITES) ? state.myFavorites : state.allCharacters)
  const userId = useSelector((state) => state.userId)
  const character = { id, name, status, species, gender, origin, image, onClose,addFav,removeFav ,userId}
  console.log(character);
  useEffect(() => {
    
      myFavorites.forEach((fav) => {
        if (fav.id === id) {
           setIsFav(true);
        }
     });
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [myFavorites]);

function handleFavorite() {
    console.log('en handleFavorite: '+userId);
    isFav ? removeFav(id,userId) : addFav(character);
    setIsFav(!isFav);
  }

  function handleNameClick(e) {
    e.preventDefault() //esto es para que no se vaya derecho a la otra página y permita el efecto mostrarse
    const { clientX, clientY, currentTarget } = e;
    const buttonRect = currentTarget.getBoundingClientRect();
    let x = clientX - buttonRect.left;
    let y = clientY - buttonRect.top;
    const ripples = (
      <span className={styles.span} style={{ left: x, top: y }}></span>
    );
    setRipples(ripples);
    setTimeout(() => {
      setRipples(null);
      navigate(ROUTES.DETAIL + `${id}`)
    }, 700);
  }

  return (
    <div className={styles.card}>
       <div className={styles.imageAndTextContainer}>
      {
         isFav ? (
        <button className={`${styles.favButton} ${styles.favButtonTrue}`} onClick={handleFavorite}>❤️</button>
      ) : (
        <button className={styles.favButton} onClick={handleFavorite}>🤍</button>
      )}
        <img src={image} alt='character' />
        <button className={styles.closeButton}onClick={() => onClose(id)}>X</button>
        <div className={styles.ripplesContainer}>
          <button className={styles.nameButton} id="nameButton" onClick={handleNameClick}>{name}{ripples}</button>
        </div>
        <div className={styles.infoDiv}>
          <h2>
            <span>Status: </span>
            {status}
          </h2>
          <h2>
            <span>Species: </span>
            {species}
          </h2>
          <h2>
            <span>Gender: </span>
            {gender}
          </h2>
          <h2>
            <span>Origin: </span>
            {origin}
          </h2>
        </div>
      </div>
    </div>
  );
}



const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => {
      dispatch(addFav(character));
    },
    removeFav: (id, userId) => {
      dispatch(removeFav(id,userId));
    },
  };
};

export default connect(null, mapDispatchToProps)(Card);
