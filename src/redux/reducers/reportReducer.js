import { reportConstants } from '../types';

const initialState = {
  isReporting: false,
  isConfirming: false,
  errorDetails: '',
  reportFails: false

}

export function reportReducer(state = initialState, action) {
  switch (action.type) {
    case reportConstants.REQUEST_FILES_REPORT:
      return {
        ...state,
        isReporting: true,
        reportData: action.data
      };
    case reportConstants.FILES_REPORT_SUCCESS:
      return {
        isReporting: false,
        reportSuccess: true
      }
    case reportConstants.FILES_REPORT_FAILS:
      return {
        isReporting: false,
        reportFails: true,
        errorDetails: action.error
      }
    case reportConstants.REQUEST_CONFIRM_REPORT:
      return {
        isConfirming: true,
        confirmSuccess: false
      }
    case reportConstants.CONFIRM_REPORT_SUCCESS:
      return {
        isConfirming: false,
        confirmSuccess: true
      }
    case reportConstants.CONFIRM_REPORT_FAILS:
      return {
        isConfirming: false,
        confirmFails: true
      }
    case reportConstants.RESET:
      return {
        state: initialState
      }
    default:
      return state
  }
}