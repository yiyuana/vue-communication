<template>
  <div class="two">
    inject中b的值：{{b}}
    <br>
    inject中test的值：{{test}}
    <br>
    <button @click="onChange">第二个组件的按钮</button>
    <Three/>
  </div>
</template>

<script>
import Three from './Three.vue'
import symbol from './symbol'

export default {
  //   inject: ['a', 'b'],
  inject: {
    a: {
      default: 'AA'   // 在 2.5.0+ 的注入可以通过设置默认值使其变成可选项
    },
    b: {
      from: 'b',  // 如果它需要从一个不同名字的属性注入，则使用 from 来表示其源属性
      default: 'no value！'
    },
    key: {
      from: symbol.KEY,
      default: () => ['no', 'value'] // 与 prop 的默认值类似，你需要对非原始值使用一个工厂方法
    },
    one: {
      default: () => ({})
    },
    _change: { // 命名与子组件冲突可以更改别名
      from: 'onChange'
    },
    test: {
      from: 'test'
    }
  },
  name: 'two',
  props: {
    two_p_b: {
      default () {
        return this.b
      }
    }
  },
  data () {
    return {
      two_d_b: this.b
    }
  },
  created () {
    console.log('-----第二个组件-----')
    console.log('inject注入的a=' + this.a)
    console.log('inject注入的b=' + this.b)
    console.log('-------------------')
    console.log('inject注入整个one组件')
    console.log(this.one)
    console.log('-------------------')
    console.log('props中b=' + this.two_p_b)
    console.log('data中b=' + this.two_d_b)
    console.log(`inject注入的Symbol类型的key=${JSON.stringify(this.key)}`)
  },
  methods: {
    onChange () {
      if (this.one && this.one.handleChange) {
        // this._change('two', '来自第二个组件的触发')

        this.test.count++ // 因为test指向的是个响应式对象，所以可以这么使用
        this.one.b = 'two.....b'

        // this.one.handleChange('two', '来自第二个组件的触发')
      }
    }
  },
  components: {
    Three
  }
}
</script>

<style scoped>
</style>
