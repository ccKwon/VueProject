<template>
    <div>


        <transition @before-enter="BeforeEnter" @enter="Enter" @after-enter="AfterEnter">
            <div v-show="ballflag" class="ball" ref = "ball"></div>
        </transition>


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

                        <p>购买数量：<numbox :max="goodsinfo.stock_quantity" @getcount = "getNumberCount"></numbox>
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
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
                        <p>上架时间：{{ goodsinfo.add_time | dateFormat}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="toGooddesc">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="toGoodcomments">商品评论</mt-button>
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
                goodsbanner: [],    // 保存获取的轮播图图片数据
                goodsinfo: [],      // 保存获取的商品详情信息数据
                ballflag: false,    // 控制小球隐藏显示的标识符
                NumberCount: 1
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
                // 获取轮播图图片
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
                // 获取商品信息
                this.$http.get('api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsinfo = result.body.message[0]
                    } else {
                        Toast('加载商品信息失败')
                    }
                })
            },


            toGooddesc() {
                // 编程式导航方式跳转到商品详情页
                this.$router.push({
                    name: 'gooddesc',
                    params: {
                        id: this.id
                    }
                })
            },

            toGoodcomments() {
                // 编程式导航方法 跳转到商品评论页面
                this.$router.push({
                    name: 'goodcomments',
                    params: {
                        id: this.id
                    }
                })

            },

            addToCart() {
                this.ballflag = !this.ballflag;
            },

            BeforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },

            Enter(el, done) {

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePositon = document.getElementById('badge').getBoundingClientRect();

                const x = badgePositon.left - ballPosition.left;
                const y = badgePositon.top - ballPosition.top;

                el.offsetWidth;
                el.style.transform = `translate(${ x }px, ${ y }px)`;
                el.style.transition = "all 0.3s cubic-bezier(0, 0, .70, 0)";
                done();
            },

            AfterEnter(el) {
                this.ballflag = !this.ballflag;

            },


            getNumberCount(count) {
                // 当子组件把数量传递给父组件时 把数据保存到 data上
                this.NumberCount = count;
                console.log(this.NumberCount);
            }

        },


        components: {
            swiper,
            numbox
        }
    }
</script>




<style lang="scss" scoped>
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


    .ball {
        background-color: red;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        z-index: 99;
        position: absolute;
        top: 435px;
        left: 150px;

    }
</style>