import {SET_USER_INFORMATION,SET_INDUSTRY_INFORMATION,SET_ADDRESS_INFORMATION,
  SET_POSITION_INFORMATION,CHANGE_LOGIN_STATE,SET_SELECTED_POSITION,
SET_SELECTED_ADDRESS,SET_PAGING_INFORMATION} from './action_types';

let actions = {
  setUserInformation: function(payload) {
    return {type: SET_USER_INFORMATION, payload};
  },
  setIndustryInformation: function(payload) {
    return {type: SET_INDUSTRY_INFORMATION, payload};
  },
  setAddressInformation: function(payload) {
    return {type: SET_ADDRESS_INFORMATION, payload};
  },
  setPositionInformation: function(payload) {
    return {type: SET_POSITION_INFORMATION, payload};
  },
  changeLoginState: function(payload) {
    return {type: CHANGE_LOGIN_STATE, payload};
  },
  setSelectedPosition: function(payload) {
    return {type: SET_SELECTED_POSITION, payload};
  },
  setSelectedAddress: function(payload) {
    return {type: SET_SELECTED_ADDRESS, payload};
  },
  setPagingInformation: function(payload) {
    return {type: SET_PAGING_INFORMATION, payload};
  },
};

export default actions;
