<template>
    <v-dialog 
      width="auto" 
      persistent
      v-model="editDialog"
      >
      <template v-slot:activator="{props}">
        <v-btn 
          variant="flat"  
          color="primary" 
          v-bind="props"
          >
          Edit Date
          <v-icon end light icon="mdi-pencil"></v-icon>
        </v-btn>
      </template>
        <div>
          <v-container class="bg-surface-variant mb-3">
            <v-row>
              <v-col xs="12">
                <v-card-title>Edit Meetup Date</v-card-title>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row wrap>
              <v-col xs="12">
                <VueDatePicker  v-model="date" model-type="dd.MM.yyyy" :teleport="true">
                </VueDatePicker>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row wrap>
              <v-col xs="12">
                <v-card-actions>
                  <v-btn color="blue-darken-1" variant="flat" @click="editDialog = false">Close</v-btn>
                  <v-btn variant="flat" color="blue-darken-1" @click="onSaveChanges">Save</v-btn>
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
      props: ['meetup'],
      data() {
          return {
              date: this.meetup.date,
              editDialog: false
              
          }
      },
      methods: {
          onSaveChanges() {
                if (this.date.trim() === '') {
                  return 
              }
              this.editDialog = false
              this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: this.date
              })
          },
          created() {
            this.date = this.meetup.date
          }
          
      }
  
  }
  
  </script>
  
  <style>
  
  </style>