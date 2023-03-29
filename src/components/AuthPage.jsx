import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { validateEmail, validatePassword } from './helpers/Validate';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/store/auth/selector';
import { authorization } from '../redux/store/auth/slices';

export const AuthPage = () => {
  const valueLogin = useRef('');
  const valuePassword = useRef('');
  const [onFocusInput, setOnFocusInput] = useState();
  const [authError, setAuthError] = useState(false);
  const { isAuth } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLoginButton = () => {
    const login = valueLogin.current.value;
    const password = valuePassword.current.value;
    dispatch(authorization({ login, password }));
    if (!isAuth) {
      setAuthError(true);
    }
  };

  const inputStyle = { height: '50px', paddingTop: 0, paddingBottom: 0 };

  return (
    <div className={'auth'} onClick={(e) => setOnFocusInput(e.target.id)}>
      <div className={'auth__background_image'} />
      <div className={'window'}>
        {authError && (
          <div style={{ position: 'absolute', marginLeft: 95, marginTop: 355, color: 'red' }}>
            Неверный логин или пароль!
          </div>
        )}
        <div className={'window__items'}>
          <span className={'window__items_title'}>Simple Hotel Check</span>
          <div className={'inputs'}>
            <div className={'window__items_inputs-block'}>
              <span>Логин</span>
              <TextField
                id={'input1'}
                inputRef={valueLogin}
                className={'window__items_inputs-block-input'}
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
            <div className={'window__items_inputs-block'}>
              <span>Пароль</span>
              <TextField
                id={'input2'}
                className={'window__items_inputs-block-input'}
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
          <div className={'button'} onClick={() => handleLoginButton()}>
            Войти
          </div>
        </div>
      </div>
    </div>
  );
};
