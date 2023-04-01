<template>
    <v-dialog 
      width="auto" 
      persistent
      v-model="registerDialog"
      >
      <template v-slot:activator="{props}">
        <v-btn 
          variant="flat"  
          color="primary" 
          v-bind="props"
          >
          {{ userIsRegistered ? 'Unregister': 'Register' }}
        </v-btn>
      </template> 
        <div>
          <v-container class="bg-surface-variant mb-3">
            <v-row wrap>
              <v-col xs="12">
                <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                <v-card-title v-else>Register for Meetup?</v-card-title>
              </v-col>
            </v-row>
            <v-divider></v-divider>
              <v-row wrap>
                <v-col xs="12">
                  <v-card-text>You can always change your decision later on</v-card-text>
                </v-col>
              </v-row>
              <v-row wrap>
                <v-col xs="12">
                  <v-card-actions>
                    <v-btn color="red-darken-1" variant="flat" @click="registerDialog = false">Cancel</v-btn>
                    <v-btn color="green-darken-1" variant="flat" @click="onAgree">Confirm</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
          </v-container>
        </div>
    </v-dialog>
  </template>
  
<script>
import VueDatepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
  export default {
    components: { VueDatepicker },
    props: ['meetupId'],
    data() {
        return {
            registerDialog: false
        }
    },
    computed: {
        userIsRegistered() {
            return this.$store.getters.user.registerMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods: {
        onAgree() {
            if (this.userIsRegistered) {
                this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
     
  
  }
  
  </script>
  
  <style>
  
  </style>