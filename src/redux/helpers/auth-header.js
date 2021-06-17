export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        //return { 'Authorization': /*'Bearer ' +*/user.token };
        return user.token;
    } else {
        return {};
    }
}


//contoh kalo mau pake autentikasi
// axios({
//     method: 'post',
//     headers: {'Authorization': authHeader()},
//     url: `${API}/${userConstants.REGISTER_REQUEST}`,
//     data: newUser
//   });