<template>
    <div>
        菜单
        2
        2
        2
        {{$route.fullPath}}
    </div>
</template>

<script>
    export default {
        created(){
            console.log(this.$route.fullPath)
        }
    }
</script>

<style lang="scss" scoped>

</style>