<template>
  <div class="three">
    inject中b的值：{{b}}
    <br>
    计算属性中获取b的值：{{getB}}
    <br>
    inject中test的值：{{test}}
    <br>
    计算属性中获取test的值：{{getTest}}
    <br>
    <button @click="_change">第三个组件的按钮</button>
  </div>
</template>

<script>
export default {
  name: 'three',
  inject: ['onChange', 'one', 'test', 'b'], // 其余和two组件中的使用基本一致，这里不一一列举了
  created () {
    console.log('-----第三个组件-----')
    console.log('inject注入整个one组件')
    console.log(this.one)
  },
  computed: {
    getTest () {
      return this.test
    },
    getB () {
      return this.b
    }
  },
  methods: {
    _change () {
      if (this.one && this.one.handleChange) {
        this.onChange('three.....b', '来自第三个组件的触发')
        this.test.count++
        // this.one.handleChange('three', '来自第三个组件的触发')
      }
    }
  }
}
</script>

<style scoped>
</style>
