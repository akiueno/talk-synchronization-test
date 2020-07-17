import {combineReducers} from 'redux';
import { messages } from './messages';
import auth from './auth';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const createRootReducer = combineReducers({
		messages: messages,
		auth: auth,
		firestore: firestoreReducer,
		firebase: firebaseReducer
});

export { createRootReducer };
