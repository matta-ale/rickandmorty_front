import { React, useState,useEffect } from 'react';
import styles from './Favorites.module.css';
import { connect, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { orderAndFilterCards, getFav} from '../../redux/actions';

const Favorites = (props) => {
  const { myFavorites } = props;
  const dispatch = useDispatch();
  // const [aux, SetAux] = useState(false);
  const [orderSelectValue, setOrderSelectValue] = useState('A');
  const [filterSelectValue, setFilterSelectValue] = useState('all');
 
  //¿esto de acá abajo reemplaza al mapDispatch to props de la misma forma que el useSelector reemplaza al mapStateToProps?
  useEffect( () => {
    dispatch(getFav())
  },[dispatch])
  
  const handleOrderAndFilter = (event) => {
    const value = event.target.value
    if (event.target.name === 'order') {
      setOrderSelectValue(value)
      dispatch(orderAndFilterCards({filterSelectValue, orderSelectValue:value}))
    }
    if (event.target.name === 'filter') {
      setFilterSelectValue(value)
      dispatch(orderAndFilterCards({filterSelectValue:value, orderSelectValue}))
    }
  }

  const onClose = () => {
    console.log('close button pressed on favorites page, no further action');
  };

  return (
    <div>
        <div className={styles.filtersContainer}>
          <h1 className={styles.title}>Favorites</h1>
          <div className={styles.selectSection}>
            <select name="order" className={styles.select} onChange={handleOrderAndFilter}>
              <option value='A'>Ascendent</option>
              <option value='D'>Descendent</option>
            </select>
          </div>
          <div className={styles.selectSection}>
            <select name = "filter" className={styles.select} onChange={handleOrderAndFilter}>
              <option value='all'>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='genderless'>Genderless</option>
              <option value='unknown'>Unknown</option>
            </select>
          </div>
        </div>
      <div className={styles.container}>
        {myFavorites.map((char) => {
          return (
            <Card
              key={char.id}
              id={char.id}
              name={char.name}
              status={char.status.toLowerCase()}
              species={char.species.toLowerCase()}
              gender={char.gender.toLowerCase()}
              origin={char.origin}
              image={char.image}
              onClose={onClose}
            />
          );
        })}
      </div>
    </div>

    //
  );
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, null)(Favorites);
