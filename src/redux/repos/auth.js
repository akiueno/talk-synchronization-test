import produce from 'immer';

export const auth = (state, payload) => {
	const newState = produce(state, (draftState) => {
		draftState.name = payload.name;
	});

	// return newState;
	return newState;
};
