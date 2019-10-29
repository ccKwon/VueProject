<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a v-for="item in cates" :key="item.id" :class="['mui-control-item', item.id == 0 ? 'mui-active': '']">
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { Toast } from "mint-ui";
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data() {
            return {
                cates: []  //所有分类的数组
            }
        },

        created() {
            this.getAllCategory()
        },

        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },

        methods: {
            getAllCategory() {
                this.$http.get('api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        // 手动拼接出最完整的分类列表
                        result.body.message.unshift({ title: "全部", id: 0 })
                        this.cates = result.body.message
                    }else{
                        Toast("获取列表失败");
                    }
                })
            }
        },
    }
</script>


<style lang="scss" scope>
    * {
        touch-action: none;
    }
</style>