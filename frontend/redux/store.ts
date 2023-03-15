import { configureStore, AnyAction, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { postApi } from './api/postApi';
import { friendrequestApi } from './api/friendrequestApi';
import { communityApi } from './api/communityApi';


const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [friendrequestApi.reducerPath]: friendrequestApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        userApi.middleware,
        postApi.middleware,
        friendrequestApi.middleware,
        communityApi.middleware,
      ]),
});

export type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: true });
