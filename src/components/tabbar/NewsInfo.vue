<template lang="">
    <div class="newsinfo-container">
        <h3 class="title">{{ NewsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ NewsInfo.add_time | dateFormat}} </span>
            <span>点击：{{ NewsInfo.click }}</span>
        </p>
        <hr noshade size="1" />
        <div class="content" v-html="NewsInfo.content"></div>


        <comments-box :id = "this.id"></comments-box>

    </div>



</template>

<script>
    import {
        Toast
    } from 'mint-ui'

    import comments from './Comments.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                NewsInfo: {}
            }
        },


        methods: {
            getNewsInfo() {
                this.$http.get('api/getnew/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.NewsInfo = result.body.message[0];
                    } else {
                        Toast("获取新闻详情失败");
                    }
                })
            }
        },


        created() {
            this.getNewsInfo();
        },



        components: {
            'comments-box': comments
        }
    }
</script>


<style <style lang="scss" scope>
    .newsinfo-container {
        padding: 0 10px;

        .title {
            font-size: 24px;
            text-align: center;
            margin: 15px 0;
        }

        .subtitle {

            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }

        .content {}
    }
</style>>