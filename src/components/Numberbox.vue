<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="CountChange" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../src/lib/mui/js/mui.min.js'

    export default {

        data() {
            return {
                maxNum: ''
            }
        },

        mounted() {
            mui('.mui-numbox').numbox();

        },


        methods: {
            CountChange() {
                // 当文本框改变时 通过调用时间立即把最新数据传给父组件
                if (this.$refs.numbox.value > this.maxNum) {
                    this.$emit("getcount", this.maxNum);
                }else {
                    this.$emit("getcount", parseInt(this.$refs.numbox.value));
                }
            }
        },

        props: ['max'],

        watch: {
            max: function (newVal, oldVal) {
                mui('.mui-numbox').numbox().setOption('max', newVal);
                this.maxNum = newVal;
            }
        },
    }
</script>


<style lang="scss" scoped>

</style>