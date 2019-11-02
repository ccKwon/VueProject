<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" @change="CountChange" ref="numbox" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from '../../src/lib/mui/js/mui.min.js'

    export default {

        data() {
            return {}
        },

        mounted() {
            mui('.mui-numbox').numbox();

        },


        methods: {
            CountChange() {
                // 当文本框改变时 通过调用时间立即把最新数据传给父组件
                this.$store.commit("updateGoodscounts", {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                });
            }
        },

        props: ['count', 'goodsid']

    }
</script>


<style lang="scss" scoped>
    .mui-numbox {
        height: 20px;
        width: 80px;
        padding: 0 25px;
        float: none !important;
        margin-left: 0 !important;
        margin: 0 0 !important;

        .mui-btn-numbox-minus {
            width: 25px;
        }

        .mui-input-numbox {
            width: 30px !important;
            // width: 33% !important;
            font-size: 13px;
        }

        .mui-btn-numbox-plus {
            width: 25px;

        }
    }
</style>