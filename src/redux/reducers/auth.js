import { actions, actionTypes } from '../actions';
import { initialState } from '../store/initialState';

export const auth = (adminUser = initialState.adminUser, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      return actions.auth.adminUser;
    default:
      return adminUser;
  }
};
