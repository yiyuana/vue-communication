<template>
  <div class="childB">
    <h3>子组件ChildB</h3>子组件ChildB的输入框：
    <input type="text" @change="_change">
  </div>
</template>

<script>
import eventBus from './bus.js'

export default {
  name: 'ChildB',
  methods: {
    _change (e) {
      eventBus.$emit('changeB', e.target.value)
    }
  }
}
</script>

<style scoped>
</style>
