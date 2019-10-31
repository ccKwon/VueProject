<template>
    <div class="goodsdesc-container">
        <h3 class="title">{{ goodinfo.title }}</h3>
        <hr>
        <div v-html="goodinfo.content" class="content"></div>
    </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui'

    export default {
        data() {
            return {
                goodinfo: []
            }
        },

        created() {
            this.getGoodDesc()
        },


        methods: {
            getGoodDesc() {
                this.$http.get('api/goods/getdesc/' + this.$route.params.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodinfo = result.body.message[0]
                        console.log(result.body.message);
                    } else {
                        Toast('获取失败')
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
    .goodsdesc-container {

        .title {
            color: #226aff;
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
        }


        .content {
            margin: 20px 10px;

            img {
                width: 100% !important;
                
            }

        }
    }
</style>