import { userConstants } from '../types';
import { userService } from '../services/userService';

export const login = (user) => {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST
        })
        userService.login(user)
            .then(
                result => {
                    if(!result){
                        throw "Login failed"
                    }
                    localStorage.setItem('profile', result)
                    dispatch(success(result));
                }
            ).catch(error => {
                // userService.logout(); //auto logout kalo error
                dispatch(failure(error.toString()));
            })

    }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, data: user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}