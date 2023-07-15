import './App.css';
import Cards from './components/Cards/Cards.jsx';
import About from './components/About/About';
import Register from './components/Register/Register';
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

  
  const handleRegister = async (userDataReg) => {
    const { email, password, repeatPassword } = userDataReg;
    if (password!==repeatPassword) {
      window.alert('Passwords are not equal')
    } else {
    try {
      const URL = '/rickandmorty/login';
      const response = await axios.post(
        URL,{email,password}
      );
      if (response.status===201) {
        window.alert('User correctly registered')
        navigate(ROUTES.LOGIN);
      } else if ((response.status===200)) {
        window.alert('User already in use. Please choose another one.')
      }
    } catch (error) {
      try {
        const {status} = error.response;
        if (status===400) {
        window.alert('Please complete your data');
        } 
      } catch (err) {
      window.alert(error);
      }
    }
  }
  };
  
  
  const handleLogin = async (userData) => {
    try {
      const { email, password } = userData;
      const URL = '/rickandmorty/login/';
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { access,userId } = data;
      dispatch(setUserId(userId))  
      dispatch(resetFavs(userId))
      setAccess(access);
      access && navigate('/home');
    } catch (error) {
      try {
        const { status,data } = error.response;
        if (status===404 || status ===403) {
        window.alert(data);
        } 
      } catch (err) {
      window.alert(error);
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
      if(!id) {
        window.alert('Please enter id')
      } else {
      try {
        const response = await axios(
          `/rickandmorty/character/${id}`
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
      {(location.pathname !== ROUTES.LOGIN && location.pathname !==ROUTES.REGISTER) && (
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
        <Route path={ROUTES.REGISTER} element={<Register handleRegister={handleRegister}/>}></Route>
        <Route path={ROUTES.FAVORITES} element={<Favorites />}></Route>
        <Route path={ROUTES.DETAIL + ':id'} element={<Detail />}></Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}
//
export default App;
