import { actions, actionTypes } from '../actions';

export const auth = (adminUser = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return actions.auth.adminUser;
    default:
      return adminUser;
  }
};
