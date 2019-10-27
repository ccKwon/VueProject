<template>
    <div>
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容(最多120字)" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="ctm-list">
            <span>全部评论</span>
            <hr>
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_tiem">

                <div class="cmt-title">
                    {{ i + 1 }}楼 &nbsp;&nbsp;
                    <p>
                        <span>用户：{{ item.user_name }}</span>
                        <span>{{ item.add_time | dateFormat}}</span>
                    </p>
                </div>
                <div class="cmt-body">
                    {{ 
                        item.content === 'undefined'? '此用户很懒 没有留下任何东西':item.content
                     }}
                </div>
                <hr>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>


<script>
    import {
        Toast
    } from 'mint-ui'

    export default {
        data() {
            return {
                pageindex: 1, //默认展示第一页数据
                comments: []
            }
        },

        methods: {
            getComments() {
                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex)
                    .then(result => {
                        if (result.body.status === 0) {
                            // 每当获取新评论时候 不把老数据清空 而是将新数据与就数据进行拼接
                            this.comments = this.comments.concat(result.body.message);
                            console.log(result.body);
                        } else {
                            Toast('获取评论列表失败')
                        }
                    })
            },


            getmore() {
                this.pageindex++;
                this.getComments()
            }
        },

        created() {
            this.getComments()
        },

        props: ["id"]


    }
</script>


<style lang="scss" scope>
    hr {
        border: none;
        border-top: 1px solid gray;
        height: 1px;
        opacity: 0.3;
    }

    h3 {
        font-size: 18px;
    }

    textarea {
        font-size: 12px;
        height: 100px;
        margin-bottom: 0;
    }


    .ctm-list {
        margin: 5px 0px;

        .cmt-item {
            font-size: 13px;

            .cmt-title {
                font-size: 11px;

                p {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-bottom: 0;
                }
            }

            .cmt-body {}
        }
    }
</style>