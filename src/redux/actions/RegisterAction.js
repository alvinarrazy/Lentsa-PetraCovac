import {userConstants} from '../types';
import {userService} from '../services/userService';



export const reqRegister = (user) => {
    return dispatch => {
        dispatch({
            type: userConstants.REGISTER_REQUEST,
            data: user
        })
    }
}

export const register = (user) => {
    return dispatch => {
        dispatch({
            type: userConstants.REGISTERING,
            data: user
        })
        userService.register(user)
            .then(
                user => {
                    if (user == undefined) {
                        throw 'register failed'
                    }
                    dispatch(success(user));
                }
            )
            .catch(error =>{
                dispatch(failure(error))
            })

    }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
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
