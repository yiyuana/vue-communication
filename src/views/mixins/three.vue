<template>
  <div class="three">
    <h3>第三个组件</h3>
    第一个组件广播的值：{{value}}
    <br>第三个组件的input：
    <input type="text" @change="_change">
  </div>
</template>

<script>
import myMinix from '@/mixins/emitter.js'

export default {
  name: 'three',
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.$on('changeThree', (value) => {
      this.value = value
    })
  },
  mixins: [myMinix],
  methods: {
    _change (e) {
      // 找到指定的祖辈组件，触发change方法，称为调度
      this.dispatch('one', 'change', e.target.value)
    }
  }
}
</script>

<style scoped>
</style>
