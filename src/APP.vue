<template>
    <div class="div-container">
        <mt-header fixed title="Vue项目">
            <span slot="left" @click="back" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <transition>
            <router-view></router-view>
        </transition>


        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item1" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/member">
                <span class="mui-icon mui-icon-contact">
                </span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span id="badge" :class="[{'animated heartBeat' : this.cssflag},' mui-badge']">
                        {{ $store.getters.getAllCount }}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item1" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>


<script>

    export default {
        data() {
            return {
                cssflag: false,
                flag: false
            }
        },

        created() {
            this.flag = this.$route.path === '/home' ? false : true;
        },

        methods: {
            back() {
                this.$router.go(-1)
            },

            setcssflag() {
                this.cssflag = true;
                // this.cssflag = false;
            }
        },

        computed: {
            count() {
                return this.$store.getters.getAllCount
            }
        },


        watch: {
            count: function () {
                this.setcssflag();
            },

            '$route.path': function (newval) {
                if (newval === '/home') {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            }
        },
    }
</script>


<style lang="scss" scoped>
    .mint-header {
        z-index: 99;
    }

    .div-container {
        padding-top: 40px;
        overflow-x: hidden;
        padding-bottom: 50px;
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;

    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
</style>