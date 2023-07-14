import { ADD_FAV, REMOVE_FAV, GET_FAV,ORDER_AND_FILTER,SET_USER, RESET_FAVS } from './types';
import axios from 'axios';

export const addFav = (character) => {
  try {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return async (dispatch) => {
      const {data} = await axios.post(endpoint, character);
      return dispatch({
        type: ADD_FAV,
        payload: data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.error(error);
  }
};

export const getFav = () => {
  const endpoint = 'http://localhost:3001/rickandmorty/fav'
  return async (dispatch) => {
    try {
    const {data} = await axios.get(endpoint);
    console.log(data);
    return dispatch({
      type: GET_FAV,
      payload: data
    })
    } catch (error) {
      console.error(error);
    }
  }
}

export const removeFav = (id,userId) => {
  try {
  console.log('en removeFav' + userId);
    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}/${userId}`;
  return async (dispatch) => {
    const {data} = await axios.delete(endpoint);
    return dispatch({
      type: REMOVE_FAV,
      payload: data,
    });
  };
  ;
} catch(error) {
  console.error(error);
}
};

export const orderAndFilterCards = (orderAndFilter) => {
  return {
    type: ORDER_AND_FILTER,
    payload: orderAndFilter
  }
}

export const setUserId = (userId) => {
  return {
    type: SET_USER,
    payload: userId
  }
}

export const resetFavs = (userId) => {
  try {
    const endpoint = `http://localhost:3001/rickandmorty/fav/${userId}`;
    return async (dispatch) => {
      const {data} = await axios.get(endpoint);
      return dispatch({
        type: RESET_FAVS,
        payload: data,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (error) {
    console.log('Oh Oh');
    console.error(error);
  }
}