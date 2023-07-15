import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom';
import {store} from '../src/redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';

// const base= 'http://localhost:3001' //usar esta para trabajar local
const base = 'https://rickandmortyback-production-75e0.up.railway.app/' //usar esta para deployar

axios.defaults.baseURL = base //usar esta para trabajar local

// ReactDOM.render(
// <BrowserRouter>  
//     <App />
// </BrowserRouter>,
//   document.getElementById('root')

// )


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


