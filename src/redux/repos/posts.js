import produce from 'immer';

export const addPosts = (state, payload) => {
  const newState = produce(state, (draftState) => {
    draftState.value = '';
    draftState.text = payload;
  });

  return newState;
};

export const changeText = (state, payload) => {
  const newState = produce(state, (draftState) => {
    draftState.value = payload;
  });

  return newState;
};
