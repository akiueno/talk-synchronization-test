import { handleActions } from 'redux-actions';
import { actions } from '../actions';
import { repos } from '../repos';
import { initialState } from '../store/initialState';

// export const auth = (adminUser = initialState.adminUser, action) => {
console.log('reducer')
console.log(actions.auth);
console.log(actions.auth())
console.log(actions.auth().type);
console.log(actions.messages);
console.log(actions.messages.submit);
console.log('reducer')

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case 'auth':
      console.log('reducer auth');
      console.log(action);
      console.log('reducer auth');
      return repos.auth(state, action.payload);
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed',
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};
