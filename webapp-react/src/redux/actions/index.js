import {SET_USER_INFORMATION,SET_INDUSTRY_INFORMATION,SET_ADDRESS_INFORMATION,
  SET_POSITION_INFORMATION,CHANGE_LOGIN_STATE,SET_SELECTED_POSITION,
SET_SELECTED_ADDRESS,SET_PAGING_INFORMATION,SET_ADMIN_INFORMATION,
SET_RESUME_INFORMATION,SET_JOB_INFORMATION,SET_ASSESS_INFORMATION,
SET_PREFERENCE_INFORMATION} from './action_types';

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
  setAdminInformation: function(payload) {
    return {type: SET_ADMIN_INFORMATION, payload};
  },
  setResumeInformation: function(payload) {
    return {type: SET_RESUME_INFORMATION, payload};
  },
  setJobInformation: function(payload) {
    return {type: SET_JOB_INFORMATION, payload};
  },
  setAssessInformation: function(payload) {
    return {type: SET_ASSESS_INFORMATION, payload};
  },
  setPreferenceInformation: function(payload) {
    return {type: SET_PREFERENCE_INFORMATION, payload};
  },
};

export default actions;
