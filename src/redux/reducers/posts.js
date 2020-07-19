import { initialState } from '../store/initialState';

export default (posts = initialState.posts, action) => {
  switch (action.type) {
    case 'post':
      const data = action.response.data;
      return { ...posts, [data.id]: data };
    default:
      return posts;
  }
};
