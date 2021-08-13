import { userConstants } from '../types';
const initialState = {
  doneRegister: false,
  isRegistering: false,
  isRegisterFailed: false,
  data: {}
}
export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true, doneRegister: false, isRegisterFailed: false, data: action.data };
    case userConstants.REGISTERING:
      return { ...state, isRegistering: true, data: action.data };
    case userConstants.REGISTER_SUCCESS:
      return { isRegistering: false, doneRegister: true };
    case userConstants.REGISTER_FAILURE:
      return { isRegistering: false, doneRegister: false, isRegisterFailed: true };
    default:
      return state
  }
}