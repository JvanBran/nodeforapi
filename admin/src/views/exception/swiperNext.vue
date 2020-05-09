<template>
    <div class="fixSper">
        <div class="swiper-container" id="swiper-container" style="height:250px;">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(goodsItem,indexs) in imgList" :key="indexs">
                    <img :src="goodsItem.img" style="height: 100%;width: 100%;">
                </div>
            </div>
        </div>
        <div class="fixBox">
            <div class="fixBoxLeft">
                <div @click="prve()"></div>
            </div>
            <div class="fixBoxContent">
                <div class="fixBoxContentText">
                    <div class="like">
                        {{imgList[index].like}}
                    </div>
                    <div class="content">
                        {{imgList[index].content}}
                    </div>
                    <div class="time">
                        {{imgList[index].time}}
                    </div>
                </div>
                <div class="fixBoxContentImg">
                    <img :src="imgList[index].img" style="height: 100%;width: 100%;">
                </div>
            </div>
            <div class="fixBoxRight">
                <div @click="next()"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        props:{
            imgList:{
                type:Array,
                default:()=>{
                    return []
                }
            }
        },
        data(){
            return{
                SwiperItem:null,
                index:0
            }
        },
        mounted(){
            this.SwiperItem = new Swiper ('#swiper-container', {
                slidesPerGroup: 1,
                slidesPerView : 7,
                centeredSlides:true,
                spaceBetween : 2,// 设置slide间的间距
                observer:true,// 异步情况下数据渲染完成，再次初始化轮播图
                observeParents:true,// 异步情况下数据渲染完成，再次初始化轮
            })
            this.index = Math.ceil((this.imgList.length-1)/2)
            this.SwiperItem.slideTo((this.index),500,false)
        },
        methods: {
            prve() {
                this.SwiperItem.slidePrev();
                if(this.SwiperItem.previousIndex){
                    this.index = this.SwiperItem.previousIndex-1
                }
                
            },
            next() {
                this.SwiperItem.slideNext();
                if(this.SwiperItem.previousIndex+1<this.imgList.length){
                    this.index = this.SwiperItem.previousIndex+1
                }
                
            },
        },
    }
</script>

<style lang="less" scoped>
.fixSper{
    position: relative;
    padding-top:20px;
    background: #000;
    height: 300px;
    .fixBox{
        position: absolute;
        height: 300px;
        width: 600px;
        top: 0;
        z-index: 99999;
        left: 32%;
        .fixBoxLeft{
            float: left;
            width: 10%;
            height: 100%;
            div{
                position: relative;
                height: 50px;
                width: 50px;
                top: 42%;
                background: url(./jiantou.png) no-repeat;
                background-size: cover;
            }
        }
        .fixBoxContent{
            float: left;
            width: 80%;
            height: 100%;
            background: #fff;
            .fixBoxContentText{
                float: left;
                height: 100%;
                width: 50%;
                .like{
                    height: 20%;
                    padding: 10px 20px;
                }
                .content{
                    height: 60%;
                    padding: 10px 20px;
                }
                .time{
                    height: 20%;
                    padding: 10px 20px;
                }
            }
            .fixBoxContentImg{
                float: left;
                height: 100%;
                width: 50%;
            }
        }
        .fixBoxRight{
            float: left;
            width: 10%;
            height: 100%;
            div{
                position: relative;
                height: 50px;
                width: 50px;
                top: 42%;
                background: url(./jiantou.png) no-repeat;
                background-size: cover;
                background-position-y: -50px;
            }
        }
    }

}
</style>