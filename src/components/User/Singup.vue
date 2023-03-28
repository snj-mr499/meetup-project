<template>
  <v-container>
    <v-row wrap v-if="error">
      <v-col xs="12" sm="6" offset-sm="3" >
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-card-text>
          <v-container>
            <v-form @submit.prevent="onSignup">
              <v-row>
                <v-col xs="12">
                  <v-text-field
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="email"
                  type="email"
                  required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12">
                  <v-text-field
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12">
                  <v-text-field
                  name="confirmPassword"
                  label="Confirm Password"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswords]"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12">
                  <v-btn type="submit" :disabled="password !== confirmPassword" >Sign Up</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 
      'Passwords do not match' : ''
    },
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup() {

      this.$store.dispatch('signUserup', {email: this.email, password: this.password})
    },
    onDismissed() {
      console.log('Dismissed Alert')
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>

</style>