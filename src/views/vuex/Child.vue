<template>
  <div class="child">
      父组件的传值： {{$store.getters.obj}}
      <br>
    <input type="text" @change="handleChange">
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Child',
  created() {
    console.log(this.$store.getters.obj)
  },
  methods: {
    ...mapActions(['handleChange'])
  }
}
</script>

<style scoped>
</style>
