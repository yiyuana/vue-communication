<template>
  <div class="one">
    <h3>第一个组件</h3>
    第三个组件派发的值: {{value}}
    <br>第一个组件的input：
    <input type="text" @change="_change">
    <Two/>
  </div>
</template>

<script>
import Two from './two'
import myMinix from '@/mixins/emitter.js'

export default {
  name: 'one',
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$on('change', (value) => {
      this.value = value
    })
  },
  mixins: [myMinix],
  methods: {
    _change (e) {
      // 找到子组件，然后触发changeThree方法，称为广播
      this.broadcast('three', 'changeThree', e.target.value)
    }
  },
  components: {
    Two
  }
}
</script>

<style scoped>
</style>
