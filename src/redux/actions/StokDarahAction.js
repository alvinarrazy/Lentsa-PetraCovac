import { stokDarahConstants, userConstants} from '../types';
import { stokDarahService } from '../services/stokDarahService';
import { userService } from '../services/userService';
import { authHeader } from '../helpers/auth-header';

export const addDataStok = (data) => {
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
            type: stokDarahConstants.REQUEST_EDIT
        })
        stokDarahService.addStokDarah(data, token)
            .then(
                results => {
                    if(!results){
                        return dispatch({
                            type: stokDarahConstants.PROCESS_FAILED //Reducernya di login reducer
                        })
                    }
                    dispatch({
                        type: stokDarahConstants.ADD_DATA,
                        data: results
                    })
                    return results
                }
            )
            .catch(error => {
                // userService.logout(); //auto logout kalo error
                dispatch(failure(error.toString()));
                return error.message
            })
    }
    function failure(error) { return { error: error, type: stokDarahConstants.PROCESS_FAILED } }
}

export const editDataStok = (data) => {
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
            type: stokDarahConstants.REQUEST_EDIT
        })
        stokDarahService.editStokDarah(data, token)
            .then(
                results => {
                    if(!results){
                        return dispatch({
                            type: stokDarahConstants.PROCESS_FAILED//Reducernya di login reducer
                        })
                    }
                    dispatch({
                        type: stokDarahConstants.EDIT_DATA,
                        data: results
                    })
                    return results
                }
            )
            .catch(error => {
                // userService.logout(); //auto logout kalo error
                dispatch(failure(error.toString()));
                return error.message
            })
    }
    function failure(error) { return { error: error, type: stokDarahConstants.PROCESS_FAILED } }
}

