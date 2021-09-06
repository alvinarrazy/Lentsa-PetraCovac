import { reportConstants } from '../types';

const initialState = {
  isReporting: false,
  isConfirming: false,
  errorDetails: '',
  reportFails: false,
  isDeleting: false,
  deleteSuccess: false,
  confirmSuccess: false,
  deletingFails: false,
  confirmFails: false
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
    case reportConstants.REQUEST_DELETE_REPORT:
      return {
        isDeleting: true,
        deleteSuccess: false
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
    case reportConstants.DELETE_REPORT_SUCCESS:
      return {
        isDeleting: false,
        deleteSuccess: true
      }
    case reportConstants.DELETE_REPORT_FAILS:
      return {
        isDeleting: false,
        deletingFails: true
      }
    case reportConstants.RESET:
      return {
        state: initialState
      }
    default:
      return state
  }
}