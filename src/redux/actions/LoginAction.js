import {userConstants} from '../types';
import {userService} from '../services/userService';
import {history} from '../helpers/history';

export const login = (user) => {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST,
            data: user
        })
        userService.login(user)
        .then(
            user => { 
                localStorage.setItem('profile', user)
                console.log(localStorage.getItem('profile'))
                dispatch(success(user));
            },
            error => {
                // userService.logout(); //auto logout kalo error
                dispatch(failure(error.toString()));
            }
        );
         
    }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, data: user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}