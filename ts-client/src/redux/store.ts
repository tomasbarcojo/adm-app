import {
  configureStore,
  type ThunkAction,
  type Action
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/auth';

const persistAuthConfig = {
  key: 'auth',
  storage,
  whiteList: ['accessToken']
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer)
  },
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare({
      serializableCheck: false
    })
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;
export const persistor = persistStore(store);

export default store;
