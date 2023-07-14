import { favReducer } from './reducer'
import thunk from 'redux-thunk';
//import {composeWithDevTools} from 'redux-devtools-extension'
const {createStore, applyMiddleware, compose} = require('redux')
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store =createStore(favReducer,composeEnhancer(applyMiddleware(thunk)))
// export const store =createStore(favReducer,applyMiddleware(thunk)) así era antes de meter mano

//  function storeMiddlewares () {
//     composeWithDevTools()
//        
//  }