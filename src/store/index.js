
import { createStore } from 'vuex'
import meetup from './meetup'
import user from './user'
import shared from './shared'

export const store = createStore({
    modules: {
        meetup: meetup,
        user: user,
        shared: shared
    }
})