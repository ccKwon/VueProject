<template>
    <div>
        图片详情
    </div>
</template>

<script>
    export default {

        data() {
            return {

                id: this.$route.params.id,
                photoinfo: []
            }
        },


        created() {
            getphotoInfo()
        },

        methods: {
            getphotoInfo() {
                this.$http.get('api/getimageInfo' + this.id).then(result => {
                    if (result.body.status === 0) {
                        console.log(result.body.message);
                    }
                })
            }
        },

    }
</script>

<style lang="scss" scope>

</style>