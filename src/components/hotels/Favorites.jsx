import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hotelsSelector } from '../../redux/store/hotels/selector';
import {
  deleteFavoriteHotel,
  getFilterPrice,
  getFilterRating,
} from '../../redux/store/hotels/slices';

export const Favorites = React.memo(() => {
  const dispatch = useDispatch();
  const { favorite } = useSelector(hotelsSelector);
  const [filterRating, setFilterRating] = useState(null);
  const [filterPrice, setFilterPrice] = useState(null);

  const handlerDeleteFavorite = (hotel) => {
    dispatch(deleteFavoriteHotel(hotel));
  };

  const handlerFilterRating = () => {
    if (!filterRating || null) {
      dispatch(getFilterRating(false));
      setFilterRating(true);
    } else if (filterRating || null) {
      dispatch(getFilterRating(true));
      setFilterRating(false);
    }
  };
  const handlerFilterPrice = () => {
    if (!filterPrice) {
      dispatch(getFilterPrice(false));
      setFilterPrice(true);
    } else if (filterPrice) {
      dispatch(getFilterPrice(true));
      setFilterPrice(false);
    }
  };

  return (
    <div className={'favorite'}>
      <span className={'title'}>Избранное</span>
      <div className={'filters'}>
        <div
          className={filterRating === null ? 'filters_rate' : 'filters_rate filters_rate_active'}
          onClick={() => handlerFilterRating()}
        >
          <span>Рейтинг</span>
          <img
            src={require(`../../assets/images/filter${
              (filterRating === null && 1) ||
              (filterRating === false && 2) ||
              (filterRating === true && 3)
            }.png`)}
          />
        </div>
        <div
          className={filterPrice === null ? 'filters_price' : 'filters_price filters_price_active'}
          onClick={() => handlerFilterPrice()}
        >
          <span>Цена</span>
          <img
            src={require(`../../assets/images/filter${
              (filterPrice === null && 1) ||
              (filterPrice === false && 2) ||
              (filterPrice === true && 3)
            }.png`)}
          />
        </div>
      </div>
      <div className={'block'}>
        {favorite?.map((hotel) => {
          return (
            <div className={'hotel'} key={hotel.hotelId}>
              <span className={'hotel_title'}>
                {hotel.hotelName}
                <img
                  src={require('../../assets/images/like.png')}
                  onClick={() => handlerDeleteFavorite(hotel)}
                />
              </span>
              <div className={'hotel_dates'}>
                <span>{hotel.date}</span>
                <span>-</span>
                <span>
                  {(hotel.days == 1 && hotel.days + ' день') ||
                    (hotel.days > 1 && hotel.days < 5 && hotel.days + ' дня') ||
                    (hotel.days > 4 && hotel.days + ' дней')}
                </span>
              </div>
              <div className={'hotel_price'}>
                <div>
                  <img
                    className={'hotel_price_stars'}
                    src={require(`../../assets/images/stars${hotel.stars}.png`)}
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
  );
});
