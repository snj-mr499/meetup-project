<template>
  <v-alert color="error" icon="$error" @input="onClose" closable :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose() {
            this.$emit('dismissed')
        }
    }
}
</script>

<style>

</style>