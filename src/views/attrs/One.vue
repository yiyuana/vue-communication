<template>
  <div class="one">
    第一个组件的value：{{value}}
    <Two :value='value' @change="handleChange" @changeTwo.native='handleChange' :test='test' />
  </div>
</template>

<script>
import Two from './Two.vue'

export default {
    name: 'one',
    data() {
        return {
            value: 10,
            test: 'hello'
        }
    },
    methods: {
        handleChange(value, msg) {
          this.value = value
          console.log(msg)
        }
    },
    components: {
        Two
    }
}
</script>

<style scoped>

</style>
