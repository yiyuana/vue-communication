<template>
  <div class="father">
    输入的值是：{{value}}
    <Child v-on:change="handleChange" :value='value' />
  </div>
</template>

<script>
import Child from './Child.vue'

export default {
    name: 'father',
    data() {
        return {
            value: ''
        }
    },
    methods: {
        handleChange(value) {
          this.value = value
        }
    },
    components: {
        Child
    }
}
</script>

<style scoped>

</style>
