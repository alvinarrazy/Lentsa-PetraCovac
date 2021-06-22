import {userConstants} from '../types';
import {userService} from '../services/userService';
import {history} from '../helpers/history';

export const logout = () => {
    return dispatch => {
        dispatch({
            type: userConstants.LOGOUT //Reducernya di login reducer
        })
        userService.logout();
    }   
}