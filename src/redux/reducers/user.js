import { USER_LOGIN, PLAYER_SCORE, PLAYER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
}

export default user;
