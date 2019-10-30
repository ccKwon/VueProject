<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中 使用 v-for 循环的话 一定要用 key绑定 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="" :class="{'full' : isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ['lunbotuList', 'isfull']
    }
</script>


<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        text-align: center;
        .mint-swipe-item {
            img {
                height: 100%;
            }
        }
    }


    .full {
        width: 100%;
    }
</style>