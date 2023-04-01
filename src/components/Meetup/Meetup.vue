<template>
  <v-container>
    <v-row wrap v-if="loading">
      <v-col xs="12">
        <v-progress-circular
            indeterminate
            color="primary"
            :width="7"
            :size="70"
            v-if="loading"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row wrap v-else>
      <v-col xs="12">
        <v-card>
          <v-card-title class="text-h6 text-primary" >
            {{ meetup.title }}
            <template v-if="userIsCreator">
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
            <v-img 
                :src="meetup.imageUrl"
                height="500"
                cover
            ></v-img>
          <v-card-text>
            <div class="text-info">{{ meetup.date }} , {{ meetup.time }} - {{ meetup.location }}</div>
            <div>
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-date-dialog>
              
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-time-dialog>
            </div>
             {{ meetup.description }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-meetup-register-dialog 
            :meetupId="meetup.id"
            v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
export default {
    props: ['id'],
    computed: {
      meetup () {
          return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated() {
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator() {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading() {
        return this.$store.getters.loading
      }
    }
}
</script>

<style>

</style>