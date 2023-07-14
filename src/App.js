import './App.css';
import Cards from './components/Cards/Cards.jsx';
import About from './components/About/About';
import Nav from './components/Nav/Nav';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from './Helpers/PathRouters';
import { setUserId,resetFavs } from './redux/actions';


function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogin = async (userData) => {
    try {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access,userId } = data;
      dispatch(setUserId(userId))  
      dispatch(resetFavs(userId))
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      
      const { status,statusText,data } = error.response;
      //window.alert(data.message);
      if (status===404 || status ===403) {
        //window.alert('Incorrect email or password');
        window.alert(data);
      } else {
        window.alert(statusText);
      }
      
    }
  };
  const handleLogout = () => {
    setCharacters([])
    setAccess(false);
  };

  useEffect(() => {
    !access && navigate(ROUTES.LOGIN); //si el access pasa de true a false, te manda ala vista login
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  const onSearch = async (id) => {
    if (characters.some((char) => char.id === Number(id))) {
      window.alert('¡That character is already shown!');
    } else {
      try {
        const response = await axios(
          `http://localhost:3001/rickandmorty/character/${id}`
        );
        const { data } = response;
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          window.alert('¡No characters with that ID!');
        } else {
          window.alert('There was an error in the request');
        }
      }
    }
  };

  const randomNum = () => {
    let randomId = Math.floor(Math.random() * 826 + 1);
    onSearch(randomId);
  };
  const onCLose = (id) => {
    const filter = characters.filter((char) => {
      return char.id !== Number(id); //o parseInt
    });
    setCharacters(filter);
  };

  return (
    <div className='App'>
      {location.pathname !== ROUTES.LOGIN && (
        <Nav
          onSearch={onSearch}
          randomNum={randomNum}
          handleLogout={handleLogout}
        />
      )}
      <Routes>
        {/* //las rutas hay que parametrizarlas. Carpeta helpers, archivo RoutesPath, objeto ROUTES.HOME */}
        <Route
          path={ROUTES.LOGIN}
          element={<Form handleLogin={handleLogin} />}
        ></Route>
        <Route
          path={ROUTES.HOME}
          element={<Cards characters={characters} onClose={onCLose} />}
        ></Route>
        <Route path={ROUTES.ABOUT} element={<About />}></Route>
        <Route path={ROUTES.FAVORITES} element={<Favorites />}></Route>
        <Route path={ROUTES.DETAIL + ':id'} element={<Detail />}></Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}
//
export default App;
