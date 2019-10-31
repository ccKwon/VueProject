<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span> {{ photoinfo.add_time | dateFormat }} </span>
            <span>点击次数：{{ photoinfo.click }}</span>
        </p>


        <hr>

        <!-- 缩略图 -->
        <div class="thumbs">
            <vue-preview :slides="thumbslist"></vue-preview>
        </div>

        <!-- 文字区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui'

    import comment from '../tabbar/Comments.vue'

    export default {

        data() {
            return {

                id: this.$route.params.id,
                photoinfo: [],
                thumbslist: []
            }
        },


        created() {
            this.getphotoInfo(),
                this.getThumbs()
        },

        methods: {
            getphotoInfo() {
                this.$http.get('api/getimageInfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.photoinfo = result.body.message[0];
                        console.log(this.photoinfo);
                    } else {
                        Toast('获取图像详情失败')
                    }
                })
            },


            getThumbs() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.w = 600,
                                item.h = 400,
                                item.msrc = item.src
                        })
                        this.thumbslist = result.body.message,
                            console.log(this.thumbslist);
                    } else {
                        Toast('获取缩略图失败')
                    }
                })
            }
        },


        components: {
            'cmt-box': comment
        }

    }
</script>

<style lang="scss" scoped>
    .photoinfo-container {
        padding: 10px;

        h3 {
            font-size: 17px;
            color: #26a2ff;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }

        .content {
            font-size: 14px;
            line-height: 25px;
            margin-left: 10px;
        }


        .thumbs {
                display: flex;

            figure {
                float: left;
                margin-block-start: 0;
                margin-block-end: 0.5em;
                margin-inline-start: 15px;
                margin-inline-end: 0;
                img {
                    width: 100px;
                    height: 80px;
                    box-shadow: 0 0 8px #999;
                }
            }

        }
    }
</style>