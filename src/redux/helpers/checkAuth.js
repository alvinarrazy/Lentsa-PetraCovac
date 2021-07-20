export function checkAuthentication() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('profile'));
    if(user) return true
    else return false
}

