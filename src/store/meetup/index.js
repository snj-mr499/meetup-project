
import { getDatabase, ref, push, child, get, update, set, remove, onValue } from 'firebase/database'
import { getDownloadURL, getStorage, uploadBytesResumable, ref as sRef } from 'firebase/storage'


export default {
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
        ]
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        }, 
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
            if (payload.time) {
                meetup.time = payload.time
            }
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
                            location: obj[key].location,
                            date: obj[key].date,
                            time: obj[key].time,
                            creatorId: obj[key].creatorId
                        })
                    }
                    
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)

                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', true)
                })
            
        },
        async createMeetup({ commit, getters }, payload) {
            try {
                const db = getDatabase();
                const meetup = {
                    title: payload.title,
                    location: payload.location,
                    //imageUrl: null,
                    description: payload.description,
                    date: payload.date,
                    time: payload.time,
                    creatorId: getters.user.id
                }
                
                const newPostKey = push(child(ref(db), 'meetups')).key
               
                const storage = getStorage()
                const metadata = {
                    contentType: 'image/jpeg'
                }
            
                const filename = payload.image.name
                const file = payload.image
                const ext = filename.slice(filename.lastIndexOf('.'))
           
                const storageRef = sRef(storage, 'meetups/' + newPostKey + '.' + ext)
                const uploadImage = uploadBytesResumable(storageRef, file, metadata)
                // we need to await at this step
                uploadImage.on("state_changed",
                    ( snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log('Upload is ' + progress + '% done')
                    },
                    (error) => {
                        alert(error)
                    },
                    () => {
                        getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                            this.imageUrl= downloadURL
                        
                            console.log(this.imageUrl)
                            
                            update(ref(db, `/meetups/${newPostKey}`), {
                                imageUrl: downloadURL
                              }).then(()=>{
                                  commit('createMeetup', {
                                    ...meetup,
                                    imageUrl: this.imageUrl
                                  })
                              })
                        })   
                    }
                )
                const updates = {} 
                updates['/meetups/' + newPostKey] = meetup
                update(ref(db),updates)
                
            } catch (error) {
                commit('setLoading', false)
                console.log(error)
            }  
        },
        updateMeetupData({ commit }, payload) {
            const db = getDatabase();
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            if (payload.time) {
                updateObj.time = payload.time
            }

            update(ref(db, '/meetups/' + payload.id), {
                updateObj
            }).then(() => {
                  commit('setLoading', false)
                commit('updateMeetup',
                    payload,
                    updateObj
                )
            })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', flase)
            })
            commit('setLoading', false)
            commit('updateMeetup', payload)
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
        }
       
    }
}