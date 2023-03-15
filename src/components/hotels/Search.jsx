import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from 'react-redux';
import { GET_HOTELS, GET_IMAGES } from '../../redux/sagas/types';
import { getSearchValue } from '../../redux/store/search/slices';
import { TodayDate } from '../helpers/TodayDate';

export const Search = React.memo(() => {
  const dispatch = useDispatch();
  const { today } = TodayDate(); /*сегодняшняя дата*/
  const [totalDays, setTotalDays] = useState(1);
  const [city, setCity] = useState('Москва');
  const [dateIn, setDateIn] = useState(today);

  const handlerSearchButton = () => {
    /*  вычисляем дату отьезда изходя из кол-ва дней и приводим в подходящий формат*/
    let dateOut = new Date(new Date(dateIn).getTime() + totalDays * 86400000);
    let dd = String(dateOut.getDate()).padStart(2, '0');
    let mm = String(dateOut.getMonth() + 1).padStart(2, '0');
    let yyyy = dateOut.getFullYear();
    dateOut = yyyy + '-' + mm + '-' + dd;
    dispatch(getSearchValue({ city, dateIn, totalDays }));
    /*отсылаем данные поиска в сагу*/
    dispatch({ type: GET_HOTELS, city, dateIn, dateOut });
    dispatch({ type: GET_IMAGES, city });
  };

  useEffect(() => {
    handlerSearchButton();
  }, []); /*при первом рендере подгрузит данные начальные*/

  const inputStyle = { height: '50px', paddingTop: 0, paddingBottom: 0, fontWeight: 300 };

  return (
    <div className={'search'}>
      <div className={'search_inputs'}>
        <div className={'search_inputs_items'}>
          Локация
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={'search_inputs_items_location'}
            inputProps={{
              style: inputStyle,
            }}
          />
        </div>
        <div className={'search_inputs_items'}>
          Дата заселения
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/*// Дата пикер дефолтный Material Ui*/}
            <DatePicker
              onChange={(newValue) => {
                setDateIn(
                  /*данные с пикера в usestate*/
                  newValue.$y +
                    '-' +
                    ((newValue.$M + 1).toString().split('').length < 2
                      ? '0' + (newValue.$M + 1)
                      : newValue.$M) +
                    '-' +
                    (newValue.$D.toString().split('').length < 2 ? '0' + newValue.$D : newValue.$D),
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={dateIn}
                  className={'search_inputs_items_date'}
                  inputProps={{
                    style: inputStyle,
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className={'search_inputs_items'}>
          Количество дней
          <TextField
            value={totalDays}
            onChange={(e) => setTotalDays(e.target.value)}
            className={'search_inputs_items_days'}
            inputProps={{
              style: inputStyle,
            }}
          />
        </div>
        <div className={'search_inputs_button'} onClick={() => handlerSearchButton()}>
          Найти
        </div>
      </div>
    </div>
  );
});
