import {combineReducers} from 'redux';
import { messages } from './messages';
import auth from './auth';

const createRootReducer = () => combineReducers({ messages, auth });

export {createRootReducer};
