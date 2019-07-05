<template>
  <div class="father">
    <Child/>
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'father',
  data () {
    return {
    }
  },
  created() {
    
  },
  components: {
    Child
  }
}
</script>

<style scoped>
</style>
