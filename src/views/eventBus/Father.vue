<template>
  <div class="father">
    <h3>父组件Father</h3>
    父组件监听子组件Child的传值：{{value}}
    <br>
    <Child/>
    <br>
    <child-b/>
  </div>
</template>

<script>
import Child from './Child.vue'
import ChildB from './ChildB.vue'
import eventBus from './bus.js'

export default {
  name: 'father',
  data () {
    return {
      value: ''
    }
  },
  created() {
    // 事件监听
    eventBus.$on('change', (value) => {
      this.value = value
    })
  },
  components: {
    Child, ChildB
  }
}
</script>

<style scoped>
</style>
