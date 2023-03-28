<template>
  <v-app>
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-item v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item 
          v-if="userIsAuthenticated"
          @click="onLogout"
          >
          <v-list-item-action>
            <v-icon icon="mdi-logout"></v-icon>
          </v-list-item-action>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar color="primary">
      <v-app-bar-nav-icon 
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up"></v-app-bar-nav-icon
        >
      <v-toolbar-title>
        <router-link to="/" >
          Dev Meetup
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
        flat 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link"
        >
          <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat 
          @click="onLogout"
          >
          <v-icon icon="mdi-logout"></v-icon>
            Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  //
export default {
  data() {
    return {
      sideNav: false,
      
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-face-man', title: 'Sign up', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-supervisor', title: 'View Meetups', link:'/meetups' },
          { icon: 'mdi-map-marker', title: 'Organize Meetups', link: '/meetup/new'},
          { icon: 'mdi-account', title: 'Profile', link: '/profile' },
      ]
    }
      return menuItems
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
