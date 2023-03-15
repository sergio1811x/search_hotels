import React from 'react';
import { Search } from './hotels/Search';
import { Favorites } from './hotels/Favorites';
import { Carousel } from './hotels/carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/store/auth/slices';
import { useNavigate } from 'react-router-dom';
import { hotelsSelector } from '../redux/store/hotels/selector';
import { searchSelector } from '../redux/store/search/selector';
import { useFormatData } from './helpers/useFormatData';
import { getFavoriteHotel } from '../redux/store/hotels/slices';
import { imagesSelector } from '../redux/store/images/selector';

export const HotelsPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { data, favorite } = useSelector(hotelsSelector);
  const { city, totalDays } = useSelector(searchSelector);
  const { images } = useSelector(imagesSelector);
  const { formatData } = useFormatData();

  const imagesData = images.flat(Infinity).map((el) => el);

  const handleLogout = () => {
    /*выход из аккаунта*/
    dispatch(logout(false));
    navigate('/');
  };

  const handleFavoriteHotel = (hotel, totalDays, formatData) => {
    const datesObj = { days: totalDays, date: formatData };
    const favoritesDate = Object.assign(datesObj, hotel);
    dispatch(getFavoriteHotel(favoritesDate));
  };

  return (
    <div className={'hotels'}>
      <div className={'top'}>
        <span className={'title'}>Simple Hotel Check</span>
        <div className={'exit'} onClick={() => handleLogout()}>
          <span className={'exit_text'}>Выйти</span>
          <img src={require('../assets/images/exit.png')} />
        </div>
      </div>
      <div className={'body'}>
        <div className={'right'}>
          <Search /> {/*Поиск*/}
          <Favorites /> {/*Избранное*/}
        </div>
        <div className={'left'}>
          <div className={'title'}>
            <div className={'title_text'}>
              <span>Отели</span>
              <span>
                <img src={require('../assets/images/arrow.png')} />
              </span>
              <span> {city}</span>
            </div>
            <span className={'title_date'}>{formatData}</span>
          </div>
          <div className={'carousel'}>
            <Carousel>
              {imagesData?.map((item, index) => {
                {
                  return item?.src?.length > 1 ? <img key={index} src={item?.src} /> : '';
                }
              })}
            </Carousel>
          </div>
          <div className={'main'}>
            <div className={'main_title'}>
              Добавлено в Избранное:
              <span>{favorite.length > 0 ? favorite.length : '-'}</span>
              {(favorite.length == 1 && ' отель') ||
                (favorite.length > 1 && favorite.length < 5 && ' отеля') ||
                (favorite.length > 4 && ' отелей')}
            </div>
            <div className={'main_info'}>
              {data?.map((hotel) => {
                return (
                  <div className={'hotel'} key={hotel.hotelId}>
                    <div className={'hotel_image'}>
                      <img src={require('../assets/images/house.png')} />
                    </div>
                    <span className={'hotel_title'}>
                      {hotel.hotelName}
                      <img
                        src={require(`../assets/images/like2.png`)}
                        onClick={() => handleFavoriteHotel(hotel, totalDays, formatData)}
                      />
                    </span>
                    <div className={'hotel_dates'}>
                      <span>{formatData}</span>
                      <span>-</span>
                      <span>
                        {(totalDays == 1 && totalDays + ' день') ||
                          (totalDays > 1 && totalDays < 5 && totalDays + ' дня') ||
                          (totalDays > 4 && totalDays + ' дней')}
                      </span>
                    </div>
                    <div className={'hotel_price'}>
                      <div>
                        <img
                          className={'hotel_price_stars'}
                          src={require(`../assets/images/stars${hotel.stars}.png`)}
                        />
                      </div>
                      <div>
                        <span className={'hotel_price_text'}>Price:</span>
                        <span className={'hotel_price_count'}>
                          {`${hotel.priceAvg.toFixed(0)}`
                            .split('')
                            .reverse()
                            .map((el, index) => (index % 3 !== 2 ? el : ` ${el}`))
                            .reverse()
                            .join('') + ' ₽'}
                        </span>
                      </div>
                    </div>
                    <div className={'hotel_line'}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
