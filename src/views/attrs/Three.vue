<template>
  <div class="three">
      <button @click="_change">第三个组件</button>
      <br/>
      第三个组件中显示第一个组件的value：{{$attrs.value}}
  </div>
</template>

<script>
export default {
    name: 'three',
    created() {
        console.log('-----第三个组件-----')
        console.log(this.$attrs)
        console.log(this.$listeners)
    },
    methods: {
        _change() {
            this.$emit('change', 3, '来自第三个组件的事件触发，感谢$listeners')
        }
    }
}
</script>

<style scoped>

</style>
