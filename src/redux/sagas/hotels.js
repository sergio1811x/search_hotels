import { put, takeEvery, call } from 'redux-saga/effects';
import { getFetchHotelsData } from '../store/hotels/slices';
import { GET_HOTELS } from './types';
import axios from 'axios';

function* getHotelsSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://engine.hotellook.com/api/v2/cache.json?location=${action.city}&checkIn=${action.dateIn}&checkOut=${action.dateOut}&limit=8&currency=rub`,
    );
    yield put(getFetchHotelsData(response.data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchHotelsAsync() {
  yield takeEvery(GET_HOTELS, getHotelsSaga);
}
