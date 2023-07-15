import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailSubContainer}>
        <div className={styles.nameDiv}>
          <h2 className={styles.nameText}>{character?.name}</h2>
        </div>
        <div className={styles.dataAndImageContainer}>  
          <div className={styles.dataContainer}>
            <div className={styles.dataSubContainer}>
              <div className={styles.dataTextContainer}>
                <h2 className={styles.h2Text}>
                  <span>Status: {character?.status}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Species: {character?.species}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Gender: {character?.gender}</span>
                </h2>
                <h2 className={styles.h2Text}>
                  <span>Origin: {character.origin?.name}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.detailImage}
              src={character?.image}
              alt='character'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
