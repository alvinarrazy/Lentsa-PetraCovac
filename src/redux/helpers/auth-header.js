const jwt = require('jsonwebtoken')

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('profile'));
    if (user && user.token) {
        //return { 'Authorization': /*'Bearer ' +*/user.token };
        const { exp } = jwt.decode(user.token)
        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            console.log("token expired", user.token)
            return null
        }
        return user.token;
    } else {
        return null;
    }
}


//contoh kalo mau pake autentikasi
// axios({
//     method: 'post',
//     headers: {'Authorization': authHeader()},
//     url: `${API}/${userConstants.REGISTER_REQUEST}`,
//     data: newUser
//   });