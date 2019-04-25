import {SET_USER_INFORMATION} from './action_types';

let actions = {
  setUserInformation: function(payload) {
    return {type: SET_USER_INFORMATION, payload};
  }
};

export default actions;
