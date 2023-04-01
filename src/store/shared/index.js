
import { getDatabase, ref, push, child, get, update, set, remove, onValue } from 'firebase/database'
import { getDownloadURL, getStorage, uploadBytesResumable, ref as sRef } from 'firebase/storage'


export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        } 
    },
    actions: {
        
        clearError({ commit }) {
            commit('clearError')
        } 
    },
    getters: {
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
}