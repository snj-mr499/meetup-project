/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import { store } from './store'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database'

import AlertCmp from './components/Shared/Alert.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyB1c1gHBb1ca1uo2tvnUofYV152mZsQxOQ',
    authDomain: 'devmeetup-93591.firebaseapp.com',
    databaseURL: 'https://devmeetup-93591-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'devmeetup-93591',
    storageBucket: 'devmeetup-93591.appspot.com',
    messagingSenderId: '274388912336',
    appId: '1:274388912336:web:3cc049368a02fde32f76d5',
    measurementId: 'G-GZJCRGERF6',
    storageBucket: 'gs://devmeetup-93591.appspot.com'
};


//Initialize Firebase
const firebase= initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

const app = createApp(App);

app.use(store);
registerPlugins(app);

app.component('VueDatePicker', VueDatePicker)
app.component('app-alert', AlertCmp)

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch('autoSignIn', user)
    }
})
store.dispatch('loadMeetups')
app.mount('#app')

export {
    database,
    storage
}