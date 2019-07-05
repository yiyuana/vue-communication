<template>
    <div class="child">
        <input type="text" :value="value" @change="_change">
        <br/>
        <button @click="_changeObj">改变obj对象</button>
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
            this.$emit('update:value', e.target.value)
        },
        _changeObj() {
            this.$emit('update:title', '新主题')
        }
    }
}
</script>

<style scoped>

</style>
