import {
  ADD_FAV,
  REMOVE_FAV,
  GET_FAV,
  ORDER_AND_FILTER,
  SET_USER,
  RESET_FAVS
} from './types';

const initialState = {
  myFavorites: [],
  allCharacters: [],
  userId: '',
};

export const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload,
      };

    case RESET_FAVS:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case ADD_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case GET_FAV:
      return {
        ...state,
        myFavorites: action.payload,
        allCharacters: action.payload,
      };

    case ORDER_AND_FILTER:
      let copy3 = [];
      if (action.payload.filterSelectValue === 'all') {
        copy3 = state.allCharacters;
      } else {
        console.log(state.allCharacters);
        copy3 = state.allCharacters.filter((char) => {
          return char.gender === action.payload.filterSelectValue;
        });
      }
      console.log('array filtrado:');
      console.log(copy3);
      copy3.sort((a, b) => {
        return action.payload.orderSelectValue === 'A'
          ? a.id - b.id
          : b.id - a.id;
      });
      return { ...state, myFavorites: copy3 };

    default:
      return { ...state };
  }
};
