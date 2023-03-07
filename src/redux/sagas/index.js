import { watchHotelsAsync } from './hotels';
import { all } from 'redux-saga/effects';
import { watchCityImagesAsync } from './images';

export function* RootSaga() {
  yield all([watchHotelsAsync(), watchCityImagesAsync()]);
}
