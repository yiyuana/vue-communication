<template>
  <div id="father">
    <Child/>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'father',
  data () {
    return {
      msg: 'hello'
    }
  },
  created () {
    this.$nextTick(() => {
      console.log(this.$children)
    })
  },
  components: {
    Child
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
