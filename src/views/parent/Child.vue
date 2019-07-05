<template>
  <div class="child">
    父组件的值：{{$parent.msg}}
    <br>
    <input type="text" @change="change">
  </div>
</template>

<script>
export default {
  name: 'Child',
  created () {
    console.log(this.$parent)
  },
  methods: {
    change(e) {
      this.$parent.msg = e.target.value
    }
  }
}
</script>

<style scoped>
</style>
