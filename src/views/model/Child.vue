<template>
    <div class="child">
        <select
            :value="phoneInfo.areaCode"
            placeholder="区号"
            @change="_changeAreaCode"
            >
            <option value="+86">+86</option>
            <option value="+60">+60</option>
        </select>
        <input
            :value="phoneInfo.phone"
            type="number"
            placeholder="手机号"
            @input="_changePhone"
        />
    </div>
</template>

<script>
export default {
    name: 'Child',
    model: {
        prop: 'phoneInfo', // 默认 value
        event: 'change' // 默认 input
    },
    props: {
        phoneInfo: Object
    },
    methods: {
        _changeAreaCode(e) {
            this.$emit('change', {
                ...this.phoneInfo,
                areaCode: e.target.value
            })
        },
        _changePhone(e) {
            this.$emit('change', {
                ...this.phoneInfo,
                phone: e.target.value
            })
        }
    }
}
</script>

<style scoped>

</style>
