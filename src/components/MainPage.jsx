import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { validateEmail, validatePassword } from './helpers/Validate';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/store/auth/selector';
import { authorization } from '../redux/store/auth/slices';

export const MainPage = () => {
  const valueLogin = useRef('');
  const valuePassword = useRef('');
  const [onFocusInput, setOnFocusInput] = useState();
  const [authError, setAuthError] = useState(false);
  const { isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handlerLoginButton = () => {
    const login = valueLogin.current.value;
    const password = valuePassword.current.value;
    dispatch(authorization({ login, password })); /*емейл и пасс в глобльный стейт*/
    if (!isAuth) {
      setAuthError(true); /*выведет ошибку если авторизация не удалась*/
    }
  };

  const inputStyle = { height: '50px', paddingTop: 0, paddingBottom: 0 };

  return (
    <div className={'main'} onClick={(e) => setOnFocusInput(e.target.id)}>
      <div className={'main_background_image'} />
      <div className={'main_window'}>
        {authError && (
          <div style={{ position: 'absolute', marginLeft: 95, marginTop: 355, color: 'red' }}>
            Неверный логин или пароль!
          </div>
        )}
        <div className={'main_window-items'}>
          <span className={'main_window-items-title'}>Simple Hotel Check</span>
          <div className={'main_window-items-inputs'}>
            <div className={'main_window-items-inputs-block'}>
              <span>Логин</span>
              <TextField
                id={'input1'}
                inputRef={valueLogin}
                className={'main_window-items-inputs-block-input'}
                placeholder={'Введите email'}
                error={validateEmail(onFocusInput, valueLogin.current.value) === false}
                label={
                  validateEmail(onFocusInput, valueLogin.current.value) === false &&
                  'Формат test@mail.com'
                }
                inputProps={{
                  style: inputStyle,
                }}
                InputLabelProps={{
                  fontSize: '20px',
                }}
              />
            </div>
            <div className={'main_window-items-inputs-block'}>
              <span>Пароль</span>
              <TextField
                id={'input2'}
                className={'main_window-items-inputs-block-input'}
                type="text"
                placeholder={'Введите пароль'}
                inputRef={valuePassword}
                onClick={(e) => setOnFocusInput(e.target.value)}
                error={validatePassword(onFocusInput, valuePassword.current.value) === false}
                label={
                  validatePassword(onFocusInput, valuePassword.current.value) === false &&
                  'Формат более 8 символов, без кириллицы'
                }
                inputProps={{
                  style: inputStyle,
                }}
              />
            </div>
          </div>
          {/*<Link to="/hotels" style={{ textDecoration: 'none' }}>*/}
          <div className={'main_window-items-button'} onClick={() => handlerLoginButton()}>
            Войти
          </div>
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
};
