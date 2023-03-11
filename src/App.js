import React, { useEffect, useState } from 'react';
import { MainPage } from './components/MainPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HotelsPage } from './components/HotelsPage';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/store/auth/selector';
import { getAuthFromLS } from './components/helpers/GetAuthFromLocalStorage.js';
import axios from 'axios';

function App() {
  const [login, setLogin] = useState();
  const { isAuth } = useSelector(authSelector);
  let navigate = useNavigate();
  let location = useLocation();
  const { auth } = getAuthFromLS(); /* проверка есть ли в локальном хранилеще авторизация*/

  /*авторизация не слетает при перезагрузке страницы*/
  useEffect(() => {
    setLogin(auth);
    if (auth) {
      navigate('/hotels');
    }
  }, [isAuth, location.pathname]);
  /*без авторизации не перейти на страницу вбив ссылку*/
  const authenticate = (component) => {
    return login ? component : <Navigate to="/" />;
  };

  return (
    <div>
      <Routes>
         <Route path="/" element={<MainPage />} />
        <Route path="/hotels" element={authenticate(<HotelsPage />)} />
      </Routes>
    </div>
  );
}

export default App;
