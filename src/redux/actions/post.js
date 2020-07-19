import { createActions } from 'redux-actions';
import axios from 'axios';

const { posts } = createActions({
  posts: {
		post(value) {
			return async (dispatch) =>  {
				const response = await axios.post(
					'http://localhost:3000/admin/admin_users/posts',
					{ headers: {
							"Authorization": "Bearer XXXXXXXXXXXXXX",
							"Content-Type": "application/json",
						},
						params: {
							"text": value, "line_id": "xxxxxaaaaaccccbbbbb", "name": "ton admin"
						}
					}
				);

				dispatch({ type: 'post', response });
			}
		},

    change(value) {
      const text = value;
      return text;
    },
  },
});

export { posts };
