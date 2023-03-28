
<template>
  <v-container>
    <v-row justify="center" class="mb-2" style="gap: 2rem">
      
        <p class="text-xs-center text-sm-right">
          <v-btn large router to="/meetups" color="info">Explore Meetups</v-btn>
        </p>
        <p class="text-xs-center text-sm-left">
          <v-btn large router to="/meetup/new" color="primary">Organize Meetups</v-btn>
        </p>   
    </v-row>
    <div class="text-center">
      <v-row>
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
    </div>
    
    <v-row class="mt-2" v-if="!loading">
      <v-col>  
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="(meetup,meet) in meetups"
            :key="meet"
            :src="meetup.imageUrl"
            cover
            @click="onLoadMeetup(meetup.id)"
          >
          <div class="title">
            {{ meetup.title }}
          </div>
        </v-carousel-item>
        </v-carousel>
      </v-col>  
    </v-row>
    <v-row justify="center" class="mb-2" style="gap: 2rem">
      
      <p class="text-xs-center">
        Join our awesome meetup
      </p>   
  </v-row>
  </v-container>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    return {
      meetups: computed(() => store.getters.featuredMeetups),
      loading: computed(() => store.getters.loading)
    } 
  },
 
  
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    text-align: center;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>