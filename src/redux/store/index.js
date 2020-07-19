import {initialState} from './initialState';
import { createRootReducer } from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from '../../firebase'

import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';


const enhancer = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    useFirestoreForProfile: true,
    userProfile: 'admin_users',
    attachAuthIsReady: true,
  })
);

export const configureStore = () => {
  const store = createStore(createRootReducer, initialState, enhancer);

  console.log("store")
  console.log(initialState);
  console.log(store);
  console.log('store');
  return store;
};
