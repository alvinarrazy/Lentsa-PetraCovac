import { dataRSConstants } from '../types';

const initialState = {
  isUpdating: false,
  updatingSuccess: false,
  updatingFails: false,
  updatedData: {}
}

export function dataRSReducer(state = initialState, action) {
  switch (action.type) {
    case dataRSConstants.ADD_DATA:
      return {
        updatingSuccess: true,
        updatingFails: false,
        updatedData: action.data,
        isUpdating: false
      };
    case dataRSConstants.EDIT_DATA:
      return {
        updatingSuccess: true,
        updatingFails: false,
        updatedData: action.data,
        isUpdating: false
      };
    case dataRSConstants.REQ_EDIT:
      return {
        updatingSuccess: false,
        updatingFails: false,
        updatedData: action.data,
        isUpdating: true
      };
    case dataRSConstants.PROCESS_FAILED:
      return {
        updatingSuccess: false,
        updatingFails: true,
        updatedData: action.data,
        isUpdating: false
      };
    default:
      return state
  }
}