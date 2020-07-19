import axios from 'axios';

export const post = (values) => async (dispatch) => {
  const response = await axios.post(
		'http://localhost:3000/admin/admin_users/posts',
		{headers: {
			"Authorization": "Bearer XXXXXXXXXXXXXX",
			"Content-Type": "application/json",
		},
		params: {
			"text": "this is test text", "line_id": "xxxxxaaaaaccccbbbbb", "name": "ton admin"
		}
	});

	dispatch({ type: 'posts', response });
};
