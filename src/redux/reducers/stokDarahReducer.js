import { stokDarahConstants } from '../types';

const initialState = {
  isUpdating: false,
  updatingSuccess: false,
  updatingFails: false,
  updatedData: {}
}

export function stokDarahReducer(state = initialState, action) {
  switch (action.type) {
    case stokDarahConstants.ADD_DATA:
      return {
        ...state,
        updatingSuccess: true,
        updatingFails: false,
        addedData: action.data,
        isUpdating: false
      };
    case stokDarahConstants.EDIT_DATA:
      return {
        updatingSuccess: true,
        updatingFails: false,
        updatedData: action.data,
        isUpdating: false
      };
    case stokDarahConstants.REQUEST_EDIT:
      return {
        updatingSuccess: false,
        updatingFails: false,
        updatedData: action.data,
        isUpdating: true
      };
    case stokDarahConstants.PROCESS_FAILED:
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