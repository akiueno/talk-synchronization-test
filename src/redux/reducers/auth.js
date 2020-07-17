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
//   switch (action.type) {
//     case actionTypes.AUTH:
//       return action.adminUser;
//     default:
//       return adminUser;
//   }
// };

// const auth = handleActions(
//   {
//     ['auth'](state, action) {
//       return {name: 'ueno'}
//       // return repos.auth(state, action.adminUser);
//     }
//   },
//   // default値
//   // initialState.adminUser
//   { name: 'initial' }
// );

// export { auth };

export default (state = initialState.auth, action) => {
  switch (action.type) {
    case 'auth':
      console.log('reducer auth');
      console.log(action);
      console.log('reducer auth');
      return repos.auth(state, action.payload);
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
      };
    default:
      console.log('reducer default');
      console.log(action);
      console.log(action.type);
      console.log('reducer default');
      return repos.auth(state, { name: 'default' });
  }
};
