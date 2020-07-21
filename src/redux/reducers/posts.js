import { initialState } from '../store/initialState';
import { handleActions } from 'redux-actions';
import { actions } from '../actions';
import { repos } from '../repos';


const posts = handleActions(
  {
    [`${actions.posts.post}`](state, action) {
      return repos.posts.addMessage(state, action.payload);
    },
    [`${actions.posts.change}`](state, action) {
      return repos.posts.changeText(state, action.payload);
    },
  },
  initialState.posts
);

export { posts };
