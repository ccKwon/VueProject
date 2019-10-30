<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a v-for="item in cates" :key="item.id"
                        :class="['mui-control-item', item.id == 0 ? 'mui-active': '']" @click="getimages(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>


        <ul class="photo_list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoslist/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">
                        {{ item.title }}
                    </h1>

                    <div class="info-body">
                        {{ item.zhaiyao }}
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import {
        Toast
    } from "mint-ui";
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        data() {
            return {
                cates: [], //所有分类的数组
                list: []
            }
        },

        created() {
            this.getAllCategory(),
                this.getimages(0)
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
                        result.body.message.unshift({
                            title: "全部",
                            id: 0
                        })
                        this.cates = result.body.message
                    } else {
                        Toast("获取列表失败");
                    }
                })
            },


            getimages(cateId) {
                this.$http.get('api/getimages/' + cateId).then(result => {
                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    } else {
                        Toast('获取图片失败')
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

    .photo_list {
        margin: 0;
        padding: 10px;
        padding-bottom: 0px;

        li {
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            position: relative;

            img {
                vertical-align: middle;
                width: 100%;
            }

            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

        }


        .info {
            max-height: 95px;
            position: absolute;
            bottom: 0;
            color: white;
            background-color: rgba(0, 0, 0, 0.4);

            .info-title {
                font-size: 14px
            }

            .info-body {
                font-size: 13px;
            }
        }
    }
</style>