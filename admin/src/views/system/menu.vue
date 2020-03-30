<template>
    <a-card :bordered="false">
        <a-row :gutter="24">
            <a-col :span="5">
                <a-button type="primary">添加根目录</a-button>
            </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top:10px;">
            <tree-list
                :dataSource="orgTree"
                :openKeys.sync="openKeys"
                :search="true"
                @click="handleClick"
                @add="handleAdd"
                @titleClick="handleTitleClick"
                >
            </tree-list>
        </a-row>
        <menuModal ref="modal" @ok="handleSaveOk" @close="handleSaveClose"></menuModal>
    </a-card>
</template>

<script>
    import {TreeList} from '@/components'
    import menuModal from './modules/menuModal'
    // creatMeunNav
    import { getMeunNav } from '@/api'
    import {listToTree} from '@/util/util'
    export default {
        data(){
            return{
                openKeys: [],
                orgTree:[],
            }
        },
        components:{
            TreeList,menuModal
        },
        created(){
            this.init()
        },
        methods: {
            async init(){
                let self = this;
                let meunList = await getMeunNav();
                const childrenNav = []
                listToTree(meunList,childrenNav,0);
                self.orgTree = childrenNav;
                childrenNav.map(item=>{
                    self.openKeys.push(item.key)
                })
            },
            handleClick (e) {
                console.log('handleClick: ', e);
            },
            handleAdd (item,k,p) {
                console.log('handleAdd:', item,k,p);
            },
            handleTitleClick(item){
                console.log('handleTitleClick: ', item);
            },
            handleSaveOk(){},
            handleSaveClose(){}
        }
    }
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>