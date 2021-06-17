import {userConstants} from '../types';
import {userService} from '../services/userService';

export const register = (newUser) => {
    return dispatch => {
        dispatch({
            type: userConstants.REGISTER_REQUEST,
            // newUser: newUser //Tes apakah kalo di komen gk bisa update database
        })

        userService.register(newUser)
    }
}


// function register(newUser) {
//     return dispatch => {
//         dispatch(request(newUser));
//NI NAMBAH SENDIRI         dispatch(success());
        
//         userService.register(newUser)
//             .then(
//                 newUser => { 
//                     dispatch(success());
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                 }
//             );
//     };

//     function request(newUser) { return { type: userConstants.REGISTER_REQUEST, newUser } }
//     function success(newUser) { return { type: userConstants.REGISTER_SUCCESS, newUser } }
//     function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
// }
