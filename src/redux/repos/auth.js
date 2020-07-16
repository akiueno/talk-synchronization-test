import produce from 'immer';

export const auth = (state, payload) => {
	const newState = produce(state, (draftState) => {
		draftState.adminUser = payload;
	});

	// return newState;
	return newState;
};
