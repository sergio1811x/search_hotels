import { put, takeEvery, call } from 'redux-saga/effects';
import { GET_IMAGES } from './types';
import axios from 'axios';
import { getCityImages } from '../store/images/slices';

function* getCityImagesSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyABOsX9PLu7gEt9CFo79S7Fz-8sw-EmfHk&cx=d3b24393833dd44e4&q=достопримечательности%20${action.city}%20фото%20красивые`,
    );
    yield put(getCityImages(response.data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchCityImagesAsync() {
  yield takeEvery(GET_IMAGES, getCityImagesSaga);
}
