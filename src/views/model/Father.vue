<template>
  <div class="father">
    输入的值是：{{phoneInfo}}
    <Child v-model="phoneInfo" />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
  name: 'father',
  data() {
    return {
      phoneInfo: {
        areaCode: '+86',
        phone: ''
      }
    }
  },
  components: {
    Child
  }
}
</script>

<style scoped>

</style>
