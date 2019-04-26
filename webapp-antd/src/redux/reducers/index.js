import {
  SET_USER_INFORMATION, SET_INDUSTRY_INFORMATION, SET_ADDRESS_INFORMATION,
  SET_POSITION_INFORMATION, CHANGE_LOGIN_STATE, SET_SELECTED_POSITION,
  SET_SELECTED_ADDRESS, SET_PAGING_INFORMATION
} from '../actions/action_types';
let initState = {
  user: {
    nickname: '',
    password: '',
    login_type: ''
  },
  isLogin: false,
  industry: [],
  address: [],
  position: [],
  selectedPosition: '',
  selectedAddress: '',
  paging: [{ list: [] }],
}

function reducer(state = initState, action) {
  let newState;
  switch (action.type) {
    case SET_USER_INFORMATION:
      newState = {
        ...state,
        user: action.payload
      };
      break;
    case SET_INDUSTRY_INFORMATION:
      newState = {
        ...state,
        industry: action.payload
      };
      break;
    case SET_ADDRESS_INFORMATION:
      newState = {
        ...state,
        address: action.payload
      };
      break;
    case SET_POSITION_INFORMATION:
      newState = {
        ...state,
        position: action.payload
      };
      break;
    case CHANGE_LOGIN_STATE:
      newState = {
        ...state,
        isLogin: action.payload
      };
      break;
    case SET_SELECTED_POSITION:
      newState = {
        ...state,
        selectedPosition: action.payload
      };
      break;
    case SET_SELECTED_ADDRESS:
      newState = {
        ...state,
        selectedAddress: action.payload
      };
      break;
    case SET_PAGING_INFORMATION:
      newState = {
        ...state,
        paging: action.payload
      };
      break;
    default:
      newState = state;
      break;
  }
  return newState;
}

export default reducer;