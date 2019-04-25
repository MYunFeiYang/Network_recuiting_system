import { SET_USER_INFORMATION } from '../actions/action_types';
let initState = {
  user: {
    nickname: '',
    password: '',
    login_type: ''
  },
  isLogin:false,
}

function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case SET_USER_INFORMATION:
      newState = {
        user: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}

export default reducer;