export const USER_LOGIN = 'USER_LOGIN';
export const USER_TOKEN = 'USER_TOKEN';
export const PLAYER_SCORE = 'PLAYER_SCORE';

export const userLogin = (state) => ({
  type: USER_LOGIN,
  payload: state,
});

export const actionScore = (state) => ({
  type: PLAYER_SCORE,
  payload: state,
});
