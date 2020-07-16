import { handleActions } from 'redux-actions';
import { actions } from '../actions';
import { repos } from '../repos';
import { initialState } from '../store/initialState';

// export const auth = (adminUser = initialState.adminUser, action) => {
console.log('reducer')
console.log(actions.auth)
console.log(`${actions.auth}`);
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

export default (adminUser = { name: 'initial' }, action) => {
  switch (action.type) {
    case 'auth':
      return repos.auth.auth(adminUser, action.payload);
    case undefined:
      return { name: 'undefined' };
    default:
      return adminUser;
  }
};
