<template>
  <div class="child">
    <input type="text" @change="_change">
  </div>
</template>

<script>
export default {
  name: 'Child',
  created () {
    console.log(this.$root)
  },
  methods: {
    _change (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped>
</style>
