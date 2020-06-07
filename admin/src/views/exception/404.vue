<template>
    <div>
        404
        <div v-if="imglist.length!=0">
            <swiperNext :imgList="imglist"></swiperNext>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { getTestImg } from '@/api/test'
    import swiperNext from './swiperNext'
    export default {
        components:{
            swiperNext
        },
        data(){
            return{
                imglist:[]
            }
        },
        mounted(){
            this.GenerateRoutes()
            let self = this;
            getTestImg().then(res=>{
                self.imglist = res
            })
            
        },
        methods: {
            ...mapActions(['GenerateRoutes']),
        }
    }
</script>

<style lang="scss" scoped>

</style>