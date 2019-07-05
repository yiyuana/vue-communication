<template>
  <div class="father">
    {{value}}
    <br/>
    {{obj}}
    <br/>
    <!-- <Child v-on:update:value='value = $event' /> -->
    <!-- sync是上面的语法糖 -->
    <!-- <Child :value.sync='value' /> -->
    <Child :value.sync='value' v-bind.sync='obj' />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
    name: 'father',
    data() {
        return {
            value: 'hello',
            obj: {
              title: '主题',
              content: '文本'
            }
        }
    },
    components: {
        Child
    }
}
</script>

<style scoped>

</style>
