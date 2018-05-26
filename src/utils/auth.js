import Cookies from 'js-cookie'

const token_name = 'token';     // 设置Header中token的字段名

var in2h = new Date(new Date().getTime() + 100 * 60 * 1000);

export function set_token(token) {
    
    return Cookies.set(token_name, token, { expires: in2h })   // 设置cookies有效期为2h
}

export function get_token() {
    return Cookies.get(token_name)
}

export function remove_token() {
    Cookies.remove(token_name);
    Cookies.remove('uid');
}

export function set_uid(uid) {
    return Cookies.set('uid', uid, { expires: in2h })
}

export function get_uid() {
    return Cookies.get('uid');
}