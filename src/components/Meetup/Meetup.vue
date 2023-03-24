<template>
  <v-container>
    <v-row wrap>
      <v-col xs="12">
        <v-card>
          <v-card-title class="text-h6 text-primary" >
            {{ meetup.title }}
          </v-card-title>
          <v-img 
                :src="meetup.imageUrl"
                height="400px"
                cover
          ></v-img>
          <v-card-text>
            <div class="text-info">{{ meetup.date }} , {{ meetup.time }} - {{ meetup.location }}</div>
            <div> {{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary">Register</v-btn>
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
        }
    }
}
</script>

<style>

</style>