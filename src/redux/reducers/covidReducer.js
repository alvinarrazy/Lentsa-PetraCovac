import { covidConstant } from '../types';

const initialState = {
  semuaKecamatan: [{}],
  desaDariKecamatan: [{}],
  kecamatanDipilih: {},
  sumDataKecamatan: [{}],
  addedData: [],
  editedData: {},
  isUpdating: false,
  doneUpdating: false,
  failedUpdating: false,
  errorDetails: ''
}

export function covidDataReducer(state = initialState, action) {
  switch (action.type) {
    case covidConstant.GET_ALL_KECAMATAN:
      return {
        ...state,
        semuaKecamatan: action.data
      };
    case covidConstant.GET_ONE_KECAMATAN:
      return {
        ...state,
        semuaKecamatan: action.data
      }
    case covidConstant.GET_DESA_IN_KECAMATAN:
      return {
        ...state,
        desaDariKecamatan: action.data
      }
    case covidConstant.GET_SUM_DATA_KECAMATAN:
      return {
        ...state,
        sumDataKecamatan: [...state.sumDataKecamatan, action.data]
      }
    case covidConstant.TAMBAH_DESA_CSV:
      return {
        ...state,
        addedData: action.data
      }
    case covidConstant.EDIT_DESA:
      return {
        ...state,
        addedData: action.data
      }
    case covidConstant.EDIT_DESA_URL:
      return {
        ...state,
        editedData: action.data,
        failedUpdating: false,
        doneUpdating: true,
        isUpdating: false
      }
    case covidConstant.REQ_EDIT:
      return {
        ...state,
        isUpdating: true,
        doneUpdating: false,
        failedUpdating: false
      }
    case covidConstant.PROCESS_FAILED:
      return {
        ...state,
        isUpdating: false,
        doneUpdating: false,
        failedUpdating: true,
        errorDetails: action.error
      }
    default:
      return state
  }
}