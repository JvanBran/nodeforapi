<template>
    <div>
        个人中心
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        created(){
            this.GenerateRoutes()
        },
        methods: {
            ...mapActions(['GenerateRoutes']),
        }
    }
</script>

<style lang="scss" scoped>

</style>