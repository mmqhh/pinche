import request from '@/utils/request'

export function login(username, password) {
    return request({
        url: '/api/login',
        method: 'post',
        data: {
            username: username,
            password: password
        }
    })
}

export function getInfo(token,uid) {
    return request({
      url: '/api/info',
      method: 'post',
      data: { token , uid}
    })
}
  
export function signUp(signUpform) {
    return request({
        url: '/api/signup',
        method: 'post',
        data: signUpform
    })
}