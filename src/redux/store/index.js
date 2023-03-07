import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import search from './search/slices';
import auth from './auth/slices';
import images from './images/slices';
import hotels from './hotels/slices';
import { RootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: { auth, hotels, search, images },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(RootSaga);
