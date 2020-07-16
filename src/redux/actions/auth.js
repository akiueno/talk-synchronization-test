export const AUTH = 'AUTH';

export const auth = () => async (dispatch) => {
	const adminUser = {}
	dispatch({ type: AUTH, adminUser });
};
