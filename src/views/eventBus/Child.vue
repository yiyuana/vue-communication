<template>
  <div class="child">
    <h3>子组件Child</h3>
    子组件监听兄弟组件ChildB的传值：{{value}}
    <br>
    子组件Child的输入框：<input type="text" @change="_change">
  </div>
</template>

<script>
import eventBus from './bus.js'

export default {
  name: 'Child',
  data () {
    return {
      value: ''
    }
  },
  created () {
    // 事件监听
    eventBus.$on('changeB', (value) => {
      this.value = value
    })
  },
  methods: {
    _change (e) {
      eventBus.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped>
</style>
