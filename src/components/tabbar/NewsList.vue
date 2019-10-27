<template lang="">
    <ul class="mui-table-view">
        <li v-for="item in NewsList" :key="item.id" class="mui-table-view-cell mui-media">
            <router-link :to="'/home/newslist/newsinfo/' + item.id">
                <img class="mui-media-object mui-pull-left"
                    :src="item.img_url">
                <div class="mui-media-body">
                    <h1>{{ item.title }}</h1>
                    <p class='mui-ellipsis'>
                        <span>发表时间：{{ item.add_time | dateFormat}}</span>
                        <span>点击次数：{{ item.click }}</span>
                    </p>
                </div>
            </router-link>
        </li>

    </ul>
</template>


<script>
    import {
        Toast
    } from 'mint-ui';

    export default {
        data() {
            return {
                NewsList: []
            }
        },

        methods: {
            getNewsList() {
                this.$http.get("api/getnewslist").then(result => {
                    if (result.body.status === 0) {
                        this.NewsList = result.body.message;
                    }else{
                        Toast("获取新闻列表失败");
                    }
                })
            }
        },

        created() {
            this.getNewsList();
        }
    }
</script>

<style lang="scss" scope>
    .mui-table-view {
        li {
            h1 {
                font-size: 14px;
            }

            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }

    }
</style>