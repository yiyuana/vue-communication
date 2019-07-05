<template>
    <div class="two">
        <button @click="_change">第二个组件</button>
        <br/>
        第二个组件的value：{{$attrs.value}}
        <Three v-bind="$attrs" v-on="$listeners"/>
    </div>
</template>

<script>
import Three from './Three.vue'

export default {
    inheritAttrs: false, // 
    name: 'two',
    props: {
        test: String
    },
    created() {
        console.log('-----第二个组件-----')
        console.log(this.$attrs) // 获取父级作用域中绑定在该组件上且没有在Prop声明的属性
        // {value: 10}
        console.log(this.$listeners) // 获取父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
        // {change: ƒ}
    },
    methods: {
        _change() {
            this.$emit('change', 2, '来自第二个组件的事件触发')
        }
    },
    components: {
        Three
    }
}
</script>

<style scoped>

</style>
