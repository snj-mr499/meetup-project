// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Meetups from '../components/Meetup/Meetups.vue'
import CreateMeetup from '../components/Meetup/CreateMeetup.vue'
import Profile from '../components/User/Profile.vue'
import Signin from '../components/User/Signin.vue'
import Signup from '../components/User/Singup.vue'
import Meetup from '../components/Meetup/Meetup.vue'
import AuthGuard from './auth-guard'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthGuard
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
