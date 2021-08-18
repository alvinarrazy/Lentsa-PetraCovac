import { userConstants } from '../types';

let user = JSON.parse(localStorage.getItem('profile'));
const initialState = user ? 
    { loggedIn: true, user, loginFailed: false } : {loggedIn: false, loginFailed: false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,//state yang dikirim ke global, bisa diganti jg di reducer kalo dibutuhin di component lain
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn:true,
        user: action.data
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loginFailed: true
      };
    case userConstants.LOGOUT:
      return {loggedIn: false};
    default:
      return state
  }
}