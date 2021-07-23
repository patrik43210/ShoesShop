export function saveUserInfo(userInfo) {
    sessionStorage.setItem('user', userInfo);
   sessionStorage.setItem('email',userInfo);


}

export function setHeader(ctx) {
    ctx.isAuth = sessionStorage.getItem('user') !== null;
    ctx.user = sessionStorage.getItem('user');
    ctx.email = sessionStorage.getItem('email');

}

