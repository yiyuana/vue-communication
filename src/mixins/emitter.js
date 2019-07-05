function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    // 遍历子组件
    var name = child.$options.name // 获取子组件的组件名

    if (name === componentName) {
      // 判断是不是要派发的子组件
      child.$emit.apply(child, [eventName].concat(params)) // 调用子组件的派发方法
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params])) // 否则this交给子组件，寻找孙子组件中是否存在
    }
  })
}
export default {
  methods: {
    // 调度
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root // 获取父组件
      var name = parent.$options.name /// 获取父组件的组件名

      while (parent && (!name || name !== componentName)) {
        // 判断父组件是否存在 && （父组件名是否为空 || 父组件名不等于要派发的组件名）
        parent = parent.$parent // 获取父组件的父组件

        if (parent) {
          // 如果父组件的父组件存在
          name = parent.$options.name // 获取父组件的父组件的组件名
        }
      }
      // 结束循环
      if (parent) {
        // 判断有没有找到要派发的父级组件
        parent.$emit.apply(parent, [eventName].concat(params)) // 调用父级的派发方法
      }
    },
    // 广播
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params) // this指向当前调用该方法的父组件
    }
  }
}
