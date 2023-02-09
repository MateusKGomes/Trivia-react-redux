import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: '',
  score: '0',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default:
    return state;
  }
}

export default user;
