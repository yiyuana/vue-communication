<template>
  <div class="one">
    data中的b:{{b}}
    <br>
    可响应对象test:{{test}}
    <br>
    <button @click="_change">第一个组件的按钮</button>
    <Two/>
  </div>
</template>

<script>
import Vue from "vue"
import Two from './Two.vue'
import symbol from './symbol'

export default {
  // provide: {
  //   a: 'A'
  // },
  provide () {
    this.test = Vue.observable({ // 可响应对象的创建，建议传响应式对象
      count: 0
    })
    return {
      a: 'A',
      test: this.test, // 赋与对象指针
      b: this.b, // 赋值操作
      [symbol.KEY]: 'C',
      one: this,
      onChange: this.handleChange
    }
  },
  name: 'one',
  data () {
    return {
      b: 'B'
    }
  },
  created () {
    console.log('-----第一个组件-----')
    console.log('data中b=' + this.b)
  },
  methods: {
    handleChange (value, msg) {
      this.b = value
      console.log(msg)
    },
    _change () {
      this.b = 'one....b'
      this.test.count++
    }
  },
  components: {
    Two
  }
}
</script>

<style scoped>
</style>
