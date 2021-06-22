import { userConstants } from '../types';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? 
    { loggedIn: true, user } : {loggedIn: false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,//state yang dikirim ke global, bisa diganti jg di reducer kalo dibutuhin di component lain
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn:true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {loggedIn: false};
    default:
      return state
  }
}