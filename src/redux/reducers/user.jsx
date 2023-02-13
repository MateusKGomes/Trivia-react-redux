import { USER_LOGIN, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: '',
  score: 0,
  gravatarImage: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      gravatarImage: action.payload.gravatarImage,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default user;
