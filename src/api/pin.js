import request from '@/utils/request'

export function startNewOrder(form, uid) {
    return request({
        url: '/api/start',
        method: 'post',
        data: { form , uid}
    })
}

export function getOrders(page) {
    return request({
        url: 'api/list',
        method: 'post',
        data: { page }
    })
}

export function getPeople(oid) {
    return request({
        url: 'api/people',
        method: 'post',
        data: { oid }
    })
}

export function join(oid,uid) {
    return request({
        url: 'api/join',
        method: 'post',
        data: { oid, uid }
    })
}

export function quit(oid, uid) {
    return request({
        url: 'api/quit',
        method: 'post',
        data: { oid, uid }
    })
}