<template>
  <v-container>
    <v-row wrap v-for="meetup in meetups" :key="meetup.id">
      <v-col 
        xs="12"
        sm="10"
        md="8"
        offset-sm="1"
        offset-md="2"
        >
        <v-card color="info"  >
          <v-container fluid>
            <v-row wrap>
              <v-col xs="5" sm="4" md="3">
                <v-img 
                :src="meetup.imageUrl"
                height="170px"
                ></v-img>
              </v-col>
              <v-col xs="7" sm="8" md="9">
                <div>
                  <v-card-title class="text-h6 mb-0">
                   {{ meetup.title }}
                  </v-card-title>
                 <v-card-subtitle>
                    {{ meetup.date  }}, {{ meetup.time }}
                  </v-card-subtitle>
                </div>
                <v-card-actions>
                  <v-btn variant="flat" color="blue-grey" :to="'/meetups/' + meetup.id">
                    <v-icon left light icon="mdi-arrow-right"></v-icon>
                    View Meetup</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>



  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style>

</style>