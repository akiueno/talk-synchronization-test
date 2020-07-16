import {initialState} from './initialState';
import {createRootReducer} from '../reducers';
import {createStore} from 'redux';

export const configureStore = () => {
  const store = createStore(createRootReducer(), initialState);

  console.log("store")
  console.log(createRootReducer());
  console.log(initialState);
  console.log(store);
  console.log('store');
  return store;
};
