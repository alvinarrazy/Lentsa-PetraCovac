import { userConstants } from '../types';
const initialState = {
  doneRegister: false,
  isRegistering: false,
  isRegisterFailed: false,
  data: {},
  errorDetails: null
}
export function registerReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, isRegistering: true, doneRegister: false, isRegisterFailed: false, data: action.data };
    case userConstants.REGISTERING:
      return { ...state, isRegistering: true, data: action.data };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, isRegistering: false, doneRegister: true };
    case userConstants.REGISTER_FAILURE:
      return { ...state, isRegistering: false, doneRegister: false, isRegisterFailed: true, errorDetails: action.error };
    default:
      return state
  }
}