<template>
  <v-container>
    <v-row wrap>
      <v-col xs="12" sm="6" offset-sm="3">
        <div class="text-h4">Create a new Meetup</div>
      </v-col>
    </v-row>
    <v-row wrap>
      <v-col xs="12">
        <v-form @submit.prevent="onCreateMeetup">
          <v-row wrap class="text-primary">
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row wrap class="text-primary">
            <v-col xs="12" sm="6" offset-sm="3">
              <v-text-field
              name="location"
              label="Location"
              id="location"
              v-model="location"
              required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row wrap class="text-primary">
            <v-col xs="12" sm="6" offset-sm="3">
              <v-file-input 
                type="file"
                accept="image/*"
                label="File input"
                prepend-icon="mdi-camera"
                @change="onFilePicked"  
              ></v-file-input>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-img :src="imageUrl" height="150"></v-img>
            </v-col>
          </v-row>
          <v-row wrap class="text-primary">
            <v-col xs="12" sm="6" offset-sm="3">
              <v-textarea
              name="description"
              label="Description"
              id="description"
              required
              multiline
              v-model="description"
              row="3"
              row-height="10"
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <h4>Choose a Date & Time</h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <VueDatePicker v-model="date" model-type="dd.MM.yyyy"></VueDatePicker>
              <p v-if="date">Selected date: {{ date }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12" sm="6" offset-sm="3">
              <VueDatePicker v-model="time" time-picker :is-24="false" model-type="hh.mm a"></VueDatePicker>
              <p v-if="time">Selected time: {{ time }}</p>
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col xs="12" sm="6" offset-sm="3">
              <v-btn color="primary" 
              :disabled="!formIsValid"
              type="submit"  
              >Create Meetup</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { VueDatePicker },
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null,
      image: null
    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
    }
    
  },
  methods: {
    onCreateMeetup(event) {
      if (!this.formIsValid) {
        return 
      }
      if (!this.image) {
        return
      }
      
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.date,
        time: this.time
      }
      
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
      
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      
    }
  }
}

</script>

<style>

</style>