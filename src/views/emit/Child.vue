<template>
    <div class="child">
        <input type="text" :value="value" @change="_change">
    </div>
</template>

<script>
export default {
    name: 'Child',
    props: {
        value: String
    },
    methods: {
        _change(e) {
            this.$emit('change', e.target.value)
        }
    }
}
</script>

<style scoped>

</style>
