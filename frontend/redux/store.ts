import { configureStore, AnyAction, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { postApi } from './api/postApi';
import { friendrequestApi } from './api/friendrequestApi';
import { communityApi } from './api/communityApi';

import { userApi } from '@entities/User';
import { viewerApi } from '@entities/viewer';


const combinedReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [viewerApi.reducerPath]: viewerApi.reducer,
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
    reducer: reducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        userApi.middleware,
        viewerApi.middleware,
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
