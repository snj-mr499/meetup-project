
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, push, child, get, update, set, remove, onValue } from 'firebase/database'



export default {
    state: {
        user: null
       
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id
            if (state.user.registerMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registerMeetups.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserFromMeetup(state, payload) {
            const registerMeetups = state.user.registerMeetups
            registerMeetups.splice(registerMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        registerUserForMeetup({ commit, getters }, payload) {
            commit('setLoading', true)
            const user = getters.user
            const db = getDatabase()
            set(ref(db, '/users/'+ user.id + '/registrations/'), {
                payload
            })
            const countRef = ref(db, '/users/' + user.id + '/registrations')
            get(countRef)
              .then((snapshot) => {
                commit('setLoading', false)
                commit('registerUserForMeetup',{id: payload, fbKey: snapshot.key})
              })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', false)
               })
            
                
            
        },
        unregisterUserFromMeetup({ commit, getters }, payload) {
            commit('setLoading', true)
            const db = getDatabase()
            const user = getters.user
            if (!user.fbKeys) {
                return
            }
            let fbKey = user.fbKeys[payload]
            get(ref(db, `/users/${user.id}`+ '/registrations/'), {
                fbKey
            })
            const removeData = ref(db, 'users/' + user.id + '/registrations')
            remove(removeData).then(() => {
                console.log("location removed")
                commit('setLoading', false)
                commit('unregisterUserFromMeetup', payload)
            }).catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
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
                            registerMeetups: [],
                            fbKeys: {}
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
                            registerMeetups: [],
                            fbKeys: {}
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
        autoSignIn({commit},payload) {
            commit('setUser', {
                id: payload.uid,
                registerMeetups: [],
                fbKeys: {}
            })
        },
        fetchUserData({ commit, getters }) {
            commit('setLoading', true)
            const dbRef = ref(getDatabase());
            //const taskRef = ref(db, '/users/' + getters.user.id + '/registrations')
            get(child(dbRef, '/users/' + getters.user.id + '/registrations/')).then((snapshot) => {
                if (snapshot.exists()) {
                    const dataPairs = snapshot.val()
                    console.log(dataPairs)
                    let registerMeetups = []
                    let swappedPairs = {}
                    for (let key in dataPairs) {
                        registerMeetups.push(dataPairs[key])
                        swappedPairs[dataPairs[key]] = key
                    }
                    console.log('Meetup Id', registerMeetups)
                    console.log('Swapped pairs', swappedPairs)

                    const updatedUser = {
                        id: getters.user.id,
                        registerMeetups: registerMeetups,
                        fbKeys: swappedPairs
                    }
                    commit('setLoading', false)
                    commit('setUser', updatedUser)
                } else {
                    console.log("No data available")
                }
                
            }).catch((error) => {
                console.log(error)
                commit('setLoading', false)
            })

        },
        logout({commit}) {
            const auth = getAuth();
            signOut(auth);
            commit('setUser', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
}