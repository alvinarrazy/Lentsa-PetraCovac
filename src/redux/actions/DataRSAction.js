import { dataRSConstants, userConstants} from '../types';
import { dataRSService } from '../services/dataRSService';
import { userService } from '../services/userService';
import { authHeader } from '../helpers/auth-header';

export const addDataRS = (data) => {
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
            type: dataRSConstants.REQ_EDIT
        })
        dataRSService.addDataRS(data, token)
            .then(
                results => {
                    if(!results){
                        return dispatch({
                            type: dataRSConstants.PROCESS_FAILED //Reducernya di login reducer
                        })
                    }
                    dispatch({
                        type: dataRSConstants.ADD_DATA,
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
    function failure(error) { return { error: error, type: dataRSConstants.PROCESS_FAILED } }
}

export const editDataRS = (data) => {
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
            type: dataRSConstants.REQ_EDIT
        })
        dataRSService.editDataRS(data, token)
            .then(
                results => {
                    if(!results){
                        return dispatch({
                            type: dataRSConstants.PROCESS_FAILED//Reducernya di login reducer
                        })
                    }
                    dispatch({
                        type: dataRSConstants.EDIT_DATA,
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
    function failure(error) { return { error: error, type: dataRSConstants.PROCESS_FAILED } }
}

