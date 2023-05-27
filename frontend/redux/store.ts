import { configureStore, AnyAction, combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { userApi } from '@entities/User';
import { viewerApi } from '@entities/viewer';
import { friendRequestButtonApi } from '@features/relationsButton';
import { relationApi } from '@entities/relation';
import { friendRequestApi } from '@entities/friendRequest/api/friendRequestApi';
import { publicationCreatorApi } from '@features/createPublication';
import { voicesButtonApi } from '@features/SetVoicesButton';
import { savedPublicationApi } from '@widgets/savedPublicationList'


const combinedReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [viewerApi.reducerPath]: viewerApi.reducer,
  [friendRequestButtonApi.reducerPath]: friendRequestButtonApi.reducer,
  [relationApi.reducerPath]: relationApi.reducer,
  [friendRequestApi.reducerPath]: friendRequestApi.reducer,
  [publicationCreatorApi.reducerPath]: publicationCreatorApi.reducer,
  [voicesButtonApi.reducerPath]: voicesButtonApi.reducer,
  [savedPublicationApi.reducerPath]: savedPublicationApi.reducer,
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
        friendRequestButtonApi.middleware,
        relationApi.middleware,
        friendRequestApi.middleware,
        publicationCreatorApi.middleware,
        voicesButtonApi.middleware,
        savedPublicationApi.middleware,
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
