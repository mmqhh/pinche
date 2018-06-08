import Vue from 'vue'
import Vuex from 'vuex'

import { login, getInfo } from '@/api/login'

import { set_token, remove_token, set_uid, get_uid } from '@/utils/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        username: '',
        realname: '',
        dept: '',
        token: '',
        uid:''
    },
    mutations: {
        set_username: (state, username) => {
            state.username = username;
        },
        set_realname: (state, realname) => {
            state.realname = realname;
        },
        set_dept: (state, dept) => {
            state.dept = dept;
        },
        set_token: (state, token) => {
            state.token = token;
        },
        set_uid: (state, uid) => {
            state.uid = uid;
        }
    },
    actions: {
        Login({ commit }, userinfo) {
            return new Promise((resolve, reject) => {
                login(userinfo.username, userinfo.password).then(res => {
                    if (res.data.status === 'success') {
                        set_token(res.data.token);
                        commit('set_token', res.data.token);
                        set_uid(res.data.uid);
                        commit('set_uid', res.data.uid)
                        resolve();
                    } else {
                        reject(res);
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        },

        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token , get_uid()).then(res => {
                    commit('set_dept', res.data.dept);
                    commit('set_username', res.data.username);
                    commit('set_realname', res.data.realname);
                    commit('set_uid', get_uid());
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        Logout({ commit }) {
            commit('set_dept', '');
            commit('set_username', '');
            commit('set_token', '');
            commit('set_uid', '');
            remove_token();

        }
    }
})

export default store