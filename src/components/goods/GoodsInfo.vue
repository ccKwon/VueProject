<template>
    <div>

        <div class="goodsinfo-container">
            <!-- 轮播图区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <swiper :lunbotuList="goodsbanner" :isfull="false"></swiper>
                    </div>
                </div>
            </div>
            <!-- 轮播图区域结束 -->


            <div class="mui-card">
                <div class="mui-card-header">{{ goodsinfo.title }}</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p class="price">
                            市场价：<del>￥{{ goodsinfo.market_price }}</del> &nbsp;&nbsp;
                            销售价：<span class="nowprice">￥{{ goodsinfo.sell_price }}</span>
                        </p>

                        <p>购买数量：<numbox></numbox>
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small">加入购物车</mt-button>
                        </p>
                    </div>
                </div>
            </div>

            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号：{{ goodsinfo.goods_no }}</p>
                        <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
                        <p>上架时间：{{ goodsinfo.add_time }}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain>商品评论</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>



<script>
    import {
        Toast
    } from 'mint-ui'

    // import mui from '../../lib/mui/js/mui.min.js'

    // 导入轮播图子组件
    import swiper from '../swiper.vue'
    // 导入数字选择框子组件
    import numbox from '../Numberbox.vue'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                goodsbanner: [],
                goodsinfo: []
            }
        },

        mounted() {
            // 初始化数字选择框组件
            // mui(Selector).numbox()
        },

        created() {
            this.getgoodsbanner()
            this.getgoodsinfo()
        },



        methods: {
            getgoodsbanner() {
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        })
                        this.goodsbanner = result.body.message;
                    }
                })
            },

            getgoodsinfo() {
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsinfo = result.body.message[0]
                        console.log(this.goodsinfo);
                    } else {
                        Toast('加载商品信息失败')
                    }
                })
            }

        },


        components: {
            swiper,
            numbox
        }
    }
</script>




<style lang="scss" scope>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
    }

    .nowprice {
        color: red;
        font-size: 15px;
        font-weight: bold;
    }


    .mui-card-footer {
        display: block !important;

        button {
            margin: 15px 0;
        }
    }
</style>