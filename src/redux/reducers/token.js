import { USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};
function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_TOKEN:
    return { ...state,
      token: action.payload };
  default:
    return state;
  }
}
export default token;
