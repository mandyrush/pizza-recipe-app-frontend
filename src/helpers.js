import cookie from 'cookie';

export function CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkAuth() {
    const cookies = cookie.parse(document.cookie);
    return cookies['loggedIn'] ? true : false;
}

export function getToken() {
    const cookies = cookie.parse(document.cookie);
    return cookies['token'];
}

export function getUserId() {
    const cookies = cookie.parse(document.cookie);
    return cookies['userId'];
}