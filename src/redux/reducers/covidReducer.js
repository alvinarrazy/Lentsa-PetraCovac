import { covidConstant } from '../types';

const initialState = {
  semuaKecamatan: [{}],
  desaDariKecamatan: [{}],
  kecamatanDipilih: {},
  sumDataKecamatan: [{}],
  addedData: [{}]
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
        addedData: action.data
      }
    default:
      return state
  }
}