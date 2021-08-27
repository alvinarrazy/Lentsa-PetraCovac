import { reportConstants } from '../types';
import { reportService } from '../services/reportService';
import { authHeader } from '../helpers/auth-header';

export const filesReport = (data, token) => {
    return dispatch => {
        dispatch({
            type: reportConstants.REQUEST_FILES_REPORT,
            data: data
        })
        reportService.filesNewReport(data, token)
            .then(
                results => {
                    if (results === undefined) {
                        throw 'failed'
                    }
                    dispatch(success(results))
                }
            ).catch(error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                })
    }
    function success(data) {
        return ({
            type: reportConstants.FILES_REPORT_SUCCESS,
            data: data
        })
    }
    function failure(error) { return { type: reportConstants.FILES_REPORT_FAILS } }
}

export const confirmReport = (data) => {
    let token = authHeader()
    return dispatch => {
        dispatch({
            type: reportConstants.REQUEST_CONFIRM_REPORT,
            data: data
        })
        reportService.confirmReport(data, token)
            .then(
                results => {
                    if (results === undefined) {
                        throw 'failed'
                    }
                    dispatch(success(results))
                },
                error => {
                    // userService.logout(); //auto logout kalo error
                    dispatch(failure(error.toString()));
                }
            );
    }
    function success(data) {
        return ({
            type: reportConstants.CONFIRM_REPORT_SUCCESS,
            data: data
        })
    }
    function failure(error) { return { type: reportConstants.CONFIRM_REPORT_FAILS } }
}