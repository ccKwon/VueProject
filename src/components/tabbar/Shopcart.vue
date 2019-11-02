<template>
    <div class="shopcart-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item, index) in CartList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">

                        <div class="mui-input-row mui-checkbox mui-left">
                            <div class="input"><input class="input" name="checkbox" value="Item 1" type="checkbox"
                                    v-model="$store.getters.isSelected[item.id]"
                                    @change="selectedchanged(item.id, $store.getters.isSelected[item.id])"></div>
                            <img :src="item.thumb_path" alt="">
                            <div class="info">
                                <h1>{{ item.title }}</h1>
                                <p>
                                    <span class="price">￥{{ item.sell_price }}</span>
                                    <numbox :count="$store.getters.getGoodsCount[item.id]" :goodsid="item.id">
                                    </numbox>
                                    <a href="" @click.prevent="remove(item.id, index)">删除</a>
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner settlement">
                        <div class="left">
                            <p>总计：</p>
                            <p>已勾选商品
                                <span class="red"> {{ $store.getters.getGoodsAmount.count }}</span>
                                件， 总价：
                                <span class="red">￥ {{ $store.getters.getGoodsAmount.amount }}</span>

                            </p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import numbox from '../shopcart-numberbox.vue';


    export default {
        data() {
            return {
                CartList: []
            }
        },

        created() {
            this.getCartList()
        },

        methods: {
            getCartList() {
                var idArr = [];
                this.$store.state.cart.forEach(item => {
                    idArr.push(item.id)
                });

                if (idArr.length <= 0) {
                    return;
                };
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
                    if (result.body.status === 0) {
                        this.CartList = result.body.message
                    }
                });
            },

            remove(id, index) {
                this.CartList.splice(index, 1);

                this.$store.commit("removegood", id)
            },

            selectedchanged(id, val) {
                this.$store.commit("updateSelected", {
                    id,
                    selected: val
                });
            }

        },

        components: {
            numbox
        }
    }
</script>

<style lang="scss" scoped>
    .shopcart-container {
        background-color: #eeeeee;
        overflow: hidden;

        .goods-list {
            .mui-card-content-inner {
                // justify-content: space-between;
                display: flex;
                align-items: center;
            }

            .input {
                float: left;
                width: 28px;
                height: 26px;
                margin-top: 10px;
                margin-right: 25px;
            }

            // .mui-checkbox {
            //     display: flex;
            //     flex-direction: column;
            //     justify-content: space-between;
            // }



            img {
                float: left;
                margin-right: 10px;
                height: 60px;
                width: 60px;
            }


            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                p {
                    text-align: left;

                    a {
                        text-align: right;
                    }
                }

                h1 {
                    font-size: 14px;
                }


                .price {
                    color: red;
                    font-weight: bold;
                }
            }
        }
    }


    .settlement {
        display: flex;
        justify-content: space-between;
        align-items: center;


        .red {
            color: red;
        }
    }
</style>