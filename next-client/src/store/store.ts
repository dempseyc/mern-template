import { createStore, action } from 'easy-peasy'
import { createTypedHooks } from 'easy-peasy';
// import { actionOn, thunk } from 'easy-peasy'
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import {Action} from 'easy-peasy'
import {users, UsersModel} from './users'
import {movies, MoviesModel} from './movies'

const config = {
  HOME_VIEWS: ['main','chat','user','more']
}

export interface StoreModel {
  config: any;
  currView: number;
  setCurrView: Action<StoreModel, StoreModel['currView']>;
  movies: MoviesModel;
  users: UsersModel;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
// export const useStore = typedHooks.useStore;

const store: StoreModel = {
  config,
  currView: 2,
  setCurrView: action((state, payload) => { state.currView = payload }),
  movies,
  users,
}

const initStore = () => {
  return createStore <StoreModel> (store);
}

const wrapper = createWrapper(initStore);

export default wrapper

// const SSR_HYDRATE = actionOn(
//   () => HYDRATE,
//   (state,target) => {
//     state.count = target.payload.count;
//   }
// )

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };