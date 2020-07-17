import {initialState} from './initialState';
import { createRootReducer } from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebasApp from 'firebase/app';

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

import { firebaseConfig } from '../../firebase/config';

const enhancer = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebasApp, firebaseConfig),
  reactReduxFirebase(firebasApp, firebaseConfig, { attachAuthIsReady: true })
);

export const configureStore = () => {
  const store = createStore(createRootReducer, initialState, enhancer);

  console.log("store")
  console.log(initialState);
  console.log(store);
  console.log('store');
  return store;
};
