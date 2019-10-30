<template>
    <div class="goods-list">
        <!-- <router-link v-for="item in goodslist" :key="item.id" class="goods-item" :to="'/home/goodslist/goodinfo/' + item.id" tag="div">

            <img :src="item.img_url" alt="">

            <h1 class="title">{{ item.title }}</h1>

            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余 {{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 使用编程式导航 -->
        <!-- 除了使用 <router-link> 创建 a 标签来定义导航链接，还可以借助 router 的实例方法 router.push() -->
        <div v-for="item in goodslist" :key="item.id" class="goods-item" @click="todetail(item.id)">
        <!-- <div v-for="item in goodslist" :key="item.id" class="goods-item" :to="'/home/goodslist/goodinfo/' + item.id" tag="div"> -->

            <img :src="item.img_url" alt="">

            <h1 class="title">{{ item.title }}</h1>

            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余 {{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </div>

        <!-- <div class="goods-item">

            <img src="https://img14.360buyimg.com/n0/jfs/t1/45124/2/5820/397999/5d36c0cdEda359655/61f65ac6aae3146b.jpg"
                alt="">

            <h1 class="title">荣耀9X 麒麟810 4000mAh超强续航
                4800万超清夜拍1111111111111111111111111111111111111111111111111111111111111111111</h1>

            <div class="info">
                <p class="price">
                    <span class="now">￥1999</span>
                    <span class="old">￥2199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>

        </div>

        <div class="goods-item">

            <img src="https://img14.360buyimg.com/n0/jfs/t1/45124/2/5820/397999/5d36c0cdEda359655/61f65ac6aae3146b.jpg"
                alt="">

            <h1 class="title">荣耀9X 麒麟810 4000mAh超强续航 4800万超清夜拍</h1>

            <div class="info">
                <p class="price">
                    <span class="now">￥1999</span>
                    <span class="old">￥2199</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余60件</span>
                </p>
            </div>

        </div> -->
        <mt-button type="danger" size="large" @click="getMoregoods">加载更多</mt-button>

    </div>


</template>




<script>
    import {
        Toast
    } from 'mint-ui';
    export default {
        data() {
            return {
                pageindex: 1,
                goodslist: []
            }
        },

        created() {
            this.getgoodslist()
        },

        methods: {
            getgoodslist() {
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message);
                    } else {
                        Toast('加载商品失败')
                    }
                })
            },


            getMoregoods() {
                this.pageindex++;
                this.getgoodslist();
            },


            todetail(id) {
                this.$router.push("/home/goodslist/goodinfo/" + id)
            }
        },
    }
</script>






<style lang="scss" scope>
    .goods-list {
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        justify-content: space-between;

        .goods-item {

            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            display: flex;
            flex-direction: column;
            min-height: 297px;
            justify-content: space-between;

            img {
                // width: 205px;
                width: 100%;
            }

            .title {
                font-size: 14px;
                padding: 0 5px;
            }

            .info {
                font-size: 12px;
                background-color: #eee;
                margin: 2px;

                p {
                    margin: 0;
                    padding: 5px;
                }

                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 15px;
                    }

                    .old {
                        margin-left: 10px;
                        font-size: 11px;
                        text-decoration: line-through;
                    }
                }


                .sell {
                    display: flex;
                    font-size: 13px;
                    justify-content: space-between;
                }
            }
        }
    }
</style>