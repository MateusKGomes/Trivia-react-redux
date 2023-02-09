import { USER_LOGIN, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return { ...state, ...action.payload };
  case USER_TOKEN: {
    return { ...state,
      token: action.payload,
    };
  }
  default:
    return state;
  }
}

export default user;
