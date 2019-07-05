<template>
  <div class="child">
    <h3>Boolean使用：</h3>
    <div>
      {{bool?'正确':'错误'}}
    </div>
    <button @click="handleChangeBool">修改父组件的bool值</button>

    <h3>String使用：</h3>
    <br>
    <div>
      {{msg}}
    </div>
    <button @click="handleChangeMsg">修改父组件的msg</button>


    <h3>Object使用：</h3>
    <div>
      childObj1: {{obj1}}
    </div>
    <button @click="handleChangeObj1">修改父组件的obj1</button>
    <div>
      childObj2: {{obj2}}
    </div>
    <button @click="handleChangeObj2">修改父组件的obj2</button>

    <h3>Array使用：</h3>
    <div>
      childArr1: {{arr1}}
    </div>
    <button @click="handleChangeArr1">修改父组件的arr1</button>
    <div>
      childArr2: {{arr2}}
    </div>
    <button @click="handleChangeArr2">修改父组件的arr2</button>
    
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    bool: Boolean,
    msg: {
      type: String,
      default: ''
    },
    obj1: {
      type: Object,
      default: () => {
        return {
          name: 'null'
        }
      }
    },
    obj2: {
      type: Object
    },
    arr1: {
      type: Array,
      // 对象或者数组最好配置默认值
      default: () => []
    },
    arr2: {
      type: Array
    },
    changeBool: {
      type: Function,
      default: () => {}
    },
    changeMsg: {
      type: Function,
      default: () => {}
    },
    changeObj1: {
      type: Function,
      default: () => {}
    },
    changeObj2: {
      type: Function,
      default: () => {}
    },
    changeArr1: {
      type: Function,
      default: () => {}
    },
    changeArr2: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
      handleChangeBool() {
        this.changeBool()
      },
      handleChangeMsg() {
        // this.msg = 'a' // 控制台会报错
        // this.childObj1.name = 'b' // 虽然没报错，但是不建议这样使用

        // 可以使用父组件给的方法来改数据
        this.changeMsg('hello world')
      },
      handleChangeObj1() {
        this.changeObj1()
      },
      handleChangeObj2() {
        this.changeObj2()
      },
      handleChangeArr1() {
        this.changeArr1()
      },
      handleChangeArr2() {
        this.changeArr2()
      }
  }
}
</script>

<style scoped>

</style>
