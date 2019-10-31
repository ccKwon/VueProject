<template>
    <div>
        商品评论
        <combox :id="$route.params.id"></combox>
   </div>
</template>

<script>

import combox from '../tabbar/Comments.vue'

export default {
    components: {
        combox
    }
}
</script>

<style lang="scss" scoped>
    
</style>