<template>
  <div class="father">
    <Child 
      :bool='bool'
      :msg='msg' 
      :obj1='obj1' 
      :obj2='obj2' 
      :arr1='arr1'
      :arr2='arr2'
      :changeBool='handleChangeBool'
      :changeMsg='handleChangeMsg'
      :changeObj1='handleChangeObj1'
      :changeObj2='handleChangeObj2'
      :changeArr1='handleChangeArr1'
      :changeArr2='handleChangeArr2'
      />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
    name: 'father',
    data() {
        return {
            bool: true,
            msg: 'msg', 
            obj1: {
                name: null
            },
            obj2: {},
            arr1: [0],
            arr2: []
        }
    },
    methods: {
        handleChangeBool() {
            this.bool = !this.bool
        },
        handleChangeMsg(value) {
            this.msg = value
        },
        handleChangeObj1() {
            this.obj1.name = 'name1'
        },
        handleChangeObj2() {
            this.obj2.name = 'name2'
            console.log(this.obj2) // 有打印但是子组件的值并未变化，原因是fatherObj2的name未在data里面声明
            // this.$set(this.obj2, 'age', 18) // 可以打印出age，如果使用了set会触发数据更新，name也会更新
        },
        handleChangeArr1() {
            // this.arr1[0] = 1  // 这种方法数组的更新不会更新到子组件上
            this.arr1 = [1] // 新数组替换触发渲染
            console.log(this.arr1)
        },
        handleChangeArr2() {
            // this.arr2[0] = 1 // 这种方法数组的更新不会更新到子组件上
            // this.arr2 = [1] // 新数组替换触发渲染
            this.$set(this.arr2, 0, 1) // 用vue的set方法触发数据的更新
            console.log(this.arr2)
        }
    },
    components: {
        Child
    }
}
</script>

<style>
#app { 
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
