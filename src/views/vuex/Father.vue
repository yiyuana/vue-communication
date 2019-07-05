<template>
  <div class="father">
    输入的值是：{{value}}
    <Child/>
  </div>
</template>

<script>
import Child from './Child.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'father',
  created() {
    this.$store.dispatch('handleSet', {
      name: 'yy',
      age: 18
    })
  },
  computed: {
    ...mapGetters(['value'])
  },
  components: {
    Child
  }
}
</script>

<style scoped>
</style>
