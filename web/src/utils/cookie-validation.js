const cookie = require('cookies-js');

const validateCookie = () => {
    let token = cookie.get('AS_AUTH');
    if (typeof token === "undefined") {
        token = '';
    }
    let valid = token.match(/^[a-f0-9]{32}$/gm);
    return valid;
}

export default validateCookie;
