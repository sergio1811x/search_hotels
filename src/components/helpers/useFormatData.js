import React from 'react';
import { useSelector } from 'react-redux';
import { searchSelector } from '../../redux/store/search/selector';

export const useFormatData = () => {
  const { dateIn } = useSelector(searchSelector);
  let date = dateIn?.split('-').reverse();
  let formatData =
    (date[1] == 1 && date[0] + ' января ' + date[2]) ||
    (date[1] == 2 && date[0] + ' февраля ' + date[2]) ||
    (date[1] == 3 && date[0] + ' марта ' + date[2]) ||
    (date[1] == 4 && date[0] + ' апреля ' + date[2]) ||
    (date[1] == 5 && date[0] + ' мая ' + date[2]) ||
    (date[1] == 6 && date[0] + ' июня ' + date[2]) ||
    (date[1] == 7 && date[0] + ' июля ' + date[2]) ||
    (date[1] == 8 && date[0] + ' августа ' + date[2]) ||
    (date[1] == 9 && date[0] + ' сентября ' + date[2]) ||
    (date[1] == 10 && date[0] + ' октября ' + date[2]) ||
    (date[1] == 11 && date[0] + ' ноября ' + date[2]) ||
    (date[1] == 12 && date[0] + ' декабря ' + date[2]);
  return { formatData };
};
