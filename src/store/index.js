
import { createStore } from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, push, child, set, onValue, get } from 'firebase/database'
import { database } from '../main'
import { FirebaseError } from 'firebase/app';

export const store = createStore({
    state: {
        loadedMeetups: [
            {
                imageUrl: 'https://i.natgeofe.com/k/5b396b5e-59e7-43a6-9448-708125549aa1/new-york-statue-of-liberty_2x1.jpg',
                id: 'absedfjeh',
                title: 'meetup in New York',
                date: new Date(),
                location: 'New York',
                description: 'New York, New York'
            },
            {
                imageUrl: 'https://a.cdn-hotels.com/gdcs/production120/d1387/9fbda0f4-926d-4d0e-8570-432c724fa40f.jpg',
                id: 'sejitohoi4ht',
                title: 'meetup in Paris',
                date: new Date(),
                location: 'Paris',
                description: 'It\'s Paris'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        }, 
        setUser(state, payload) {
            state.user = payload
        },
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
        loadMeetups({ commit }) {
            commit('setLoading', true)
            const db = getDatabase()
            get(ref(db, 'meetups'))
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            time: obj[key].time
                        })
                    }
                    
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)

                })
                .catch((error) => {
                    console.log(error)
                })
            
        },
        createMeetup({ commit, getters }, payload) {
            const db = getDatabase();
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                time: payload.time
            }
            // const newPostKey =push(child(ref(db), 'meetups')).key
            // const updates = {}
            // updates['/meetups/' + newPostKey] = meetup


            push(child(ref(db), 'meetups'))
                .then((data) => {
                    const key = data.key
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            
            // store in firebase 
            
        },
        signUserup({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError', )
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, payload.email, payload.password)
                .then(
                    (userCrendential) => {
                        commit('setLoading', false)
                        const newUser = {
                            id: userCrendential.uid,
                            registerMeetups: []
                        }
                        commit('setUser', newUser )
                }
            )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                }
            )
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError', )
            const auth = getAuth();
            signInWithEmailAndPassword(auth, payload.email, payload.password)
                .then(
                    (userCrendential) => {
                        commit('setLoading', false)
                        const newUser = {
                            id: userCrendential.uid,
                            registerMeetups: []
                        }
                        commit('setUser', newUser )
                    }
            )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                 }
            )
        },
        clearError({ commit }) {
            commit('clearError')
        } 
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort(( meetupA, meetupB ) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0,5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }
})