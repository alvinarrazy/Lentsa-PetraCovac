//MASIH ERROR JANGAN DIPAKE DULU
import {API} from '../../config';
import axios from 'axios';
import {userConstants} from '../types';
import {authHeader} from '../helpers/auth-header';

export const userService = {    
    logout,
    register,
    adminLogin
};

// axios.interceptors.request.use(
//     config => {
//       const { origin } = new URL(config.url);
//       const allowedOrigins = [API];
//       const token = localStorage.getItem('token');
//       if (allowedOrigins.includes(origin)) {
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

  //tambahin fitur logout
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('profile');
    console.log("user udah dibuang");
}

function register(newUser) {
    axios.post(`${API}/${userConstants.REGISTER_REQUEST}`, newUser)
}


//Udah bisa login, tambah fitur logout
async function adminLogin(user){
    try{
        const data = await axios.post(`${API}/${userConstants.ADMIN_LOGIN_REQUEST}`, user)
        return JSON.stringify(data.data);//kalau mau dipanggil JSONparse dulu biar bisa dipake
    }catch(err){
        console.log(err.message)
    }
}


// function login(user){
//     axios.post(`${API}/${userConstants.LOGIN_REQUEST}`, user);
// }

 function handleResponse(response) {
     return response.text().then(text => {
         const data = text && JSON.parse(text);
         if (!response.ok) {
             if (response.status === 401) {
                 // auto logout if 401 response returned from api
                 logout();
             }
             const error = (data && data.message) || response.statusText;
             return Promise.reject(error);
         }
         return data;
     });
 }