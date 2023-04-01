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
        edit
        <v-icon end light icon="mdi-pencil"></v-icon>
      </v-btn>
    </template>
      <v-card>
        <v-container>
          <v-row>
            <v-col xs="12">
              <v-card-title>Edit Meetup</v-card-title>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row wrap>
            <v-col xs="12">
              <v-card-text>
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="editedTitle"
                  required>
                </v-text-field>
                <v-textarea
                  name="description"
                  label="Description"
                  id="description"
                  required
                  multiline
                  v-model="editedDescription"
                  row="3"
                  row-height="10"
                >
                </v-textarea>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row wrap>
            <v-col xs="12">
              <v-card-actions>
                <v-btn variant="flat" color="blue-darken-1" @click="editDialog = false">Close</v-btn>
                <v-btn variant="flat" color="blue-darken-1" @click="onSaveChanges">Save</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </v-dialog>
</template>

<script >
export default {
    props: ['meetup'],
    data() {
        return {
            editDialog: false,
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods: {
        onSaveChanges() {
            if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
                return 
            }
            this.editDialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        }
    }

}
</script>

<style>

</style>