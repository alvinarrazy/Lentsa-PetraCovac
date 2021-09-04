import { covidConstant, userConstants} from '../types';
import { covidService } from '../services/covidService';
import { userService } from '../services/userService';
import { history } from '../helpers/history';
import { authHeader } from '../helpers/auth-header';
import { logout } from './LogoutAction';

export const getAllKecamatan = () => {
    return dispatch => {
        covidService.getAllKecamatan()
            .then(
                results => {
                    let mapsArray = results.semua_kecamatan.map(result => {
                        return {
                            nama_kecamatan: result.nama_kecamatan,
                            id_kecamatan: result._id
                        }
                    })
                    dispatch({
                        type: covidConstant.GET_ALL_KECAMATAN,
                        data: mapsArray
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );

    }
    function failure(error) { return { error: error } }
}

export const getOneKecamatan = (namaKecamatan) => {
    return dispatch => {
        covidService.getOneKecamatan(namaKecamatan)
            .then(
                result => {
                    let responseData = {
                        nama_kecamatan: result.semua_kecamatan[0].nama_kecamatan,
                        _id: result.semua_kecamatan[0]._id
                    }
                    dispatch({
                        type: covidConstant.GET_ALL_KECAMATAN,
                        data: responseData
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );

    }
    function failure(error) { return { error: error } }
}

export const getDesaInKecamatan = (idKecamatan) => {
    return dispatch => {
        covidService.getDesaInKecamatan(idKecamatan)
            .then(
                results => {
                    let mapsArray = results.semua_desa.map(result => {
                        return {
                            _id: result._id,
                            nama_desa: result.nama_desa,
                            id_kecamatan: result.id_kecamatan,
                            nama_kecamatan: result.nama_kecamatan,
                            suspek: result.suspek,
                            discharded: result.discharded,
                            meninggal: result.meninggal,
                            keterangan: result.keterangan,
                            konfirmasi_symptomatik: result.konfirmasi_symptomatik,
                            konfirmasi_asymptomatik: result.konfirmasi_asymptomatik,
                            konfirmasi_sembuh: result.konfirmasi_sembuh,
                            konfirmasi_meninggal: result.konfirmasi_meninggal,
                            keterangan_konfirmasi: result.keterangan_konfirmasi
                        }
                    })
                    dispatch({
                        type: covidConstant.GET_DESA_IN_KECAMATAN,
                        data: mapsArray
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}

export const getSumDataKecamatan = (idKecamatan) => {
    return dispatch => {
        covidService.getSumDataKecamatan(idKecamatan)
            .then(
                results => {
                    let mapsArray = results.map(result => {
                        return {
                            nama_kecamatan: result.nama_kecamatan,
                            data: {
                                suspek: result.suspek,
                                discharded: result.discharded,
                                meninggal: result.meninggal,
                                konfirmasi_asymptomatik: result.konfirmasi_asymptomatik,
                                konfirmasi_symptomatik: result.konfirmasi_symptomatik,
                                konfirmasi_sembuh: result.konfirmasi_sembuh,
                                konfirmasi_meninggal: result.konfirmasi_meninggal
                            }
                        }
                    })
                    dispatch({
                        type: covidConstant.GET_SUM_DATA_KECAMATAN,
                        data: mapsArray
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}

export const addKecamatan = () => {
    return dispatch => {
        covidService.getDesaInKecamatan()
            .then(
                results => {
                    let mapsArray = results.semua_desa.map(result => {
                        return {

                        }
                    })
                    dispatch({
                        type: covidConstant.GET_DESA_IN_KECAMATAN,
                        data: mapsArray
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}
export const addDesaCSV = (fileCSV) => {
    return dispatch => {
        covidService.addDesaCSV(fileCSV)
            .then(
                results => {
                    dispatch({
                        type: covidConstant.TAMBAH_DESA_CSV,
                        data: results
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}

export const getDesaInURL = (idKecamatan) => {
    return dispatch => {
        covidService.getDesaInKecamatan(idKecamatan)
            .then(
                results => {
                    dispatch({
                        type: "testing",
                        data: results
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}

export const editDataDesa = (data) => {
    return dispatch => {
        covidService.updateDataDesa(data)
            .then(
                results => {
                    dispatch({
                        type: covidConstant.EDIT_DESA,
                        data: results
                    })
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function failure(error) { return { error: error } }
}

export const editDataDesaURL = (data) => {
    return dispatch => {
        let token = authHeader()
        if (!token) {
            dispatch({
                type: userConstants.LOGOUT //Reducernya di login reducer
            })
            userService.logout()
            // throw "Auth Failed"
        }
        dispatch({
            type: covidConstant.REQ_EDIT
        })
        covidService.updateDataDesaURL(data, token)
            .then(
                results => {
                    if(!results){
                        dispatch({
                            type: covidConstant.PROCESS_FAILED //Reducernya di login reducer
                        })
                    }
                    dispatch({
                        type: covidConstant.EDIT_DESA_URL,
                        data: results
                    })
                    return results
                },
            ).catch(error => {
                // userService.logout(); //auto logout kalo error
                dispatch(failure(error.toString()));
                return error.message
            })
    }
    function failure(error) { return { error: error.response.data } }
}

