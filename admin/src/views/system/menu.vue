<template>
    <a-card :bordered="false">
        <a-row :gutter="24">
            <a-col :span="5">
                <a-button type="primary" @click="addRootMeun">添加根目录</a-button>
            </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top:10px;">
            <tree-list
                :dataSource="orgTree"
                :openKeys.sync="openKeys"
                :search="true"
                @click="handleClick"
                @add="handleAdd"
                @edit="handEdit"
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
                meunList:[],
                dataType:{
                  _id:'',
                  parent_id:'', //父级id
                  title:'', //栏目标题
                  path:'', //栏目路由路径
                  name:'', //栏目路由名
                  component:'', //栏目文件地址 模版或者页面imports
                  redirect:'', //如果是组则为默认跳转页面否则为空
                  icon:'', //栏目图标 只有组标题才显示
                  keepAlive:'',//是否需要缓存状态
                  hideChildren:'', // 强制显示 MenuItem 而不是 SubMenu
                  hideHeader: '', //
                  permission:'', //权限名
                  isShow:'', //是否显示    前端则是删除
                  show:'', //是否在列表上显示
                  target:'', //打开方式
                  buttonpermissionList:'', //界面按钮
                }
            }
        },
        components:{
            TreeList,menuModal
        },
        created(){
            const self = this
            self.init()
        },
        methods: {
            async init(){
                let self = this;
                self.meunList = await getMeunNav();
                const childrenNav = []
                listToTree(self.meunList,childrenNav,0);
                self.orgTree = childrenNav;
                childrenNav.map(item=>{
                    self.openKeys.push(item.key)
                })
            },
            handleClick (e) {
                let self = this;
                self.meunList.map(item=>{
                  if(item._id == e.key){
                     self.$refs.modal.edit(self.filterObj(item),'edit')
                  }
                })

            },
            handleAdd (item,k,p) {
                console.log('handleAdd:', item,k,p);
            },
            filterObj(obj){
              let objFilcter = {};
              Object.keys(this.dataType).map(item=>{
                  objFilcter[item]= obj[item]
              })
              return objFilcter
            },
            handEdit(item){
              switch(item.key){
                case 'edit':
                  this.$refs.modal.edit(this.filterObj(item),'edit')
                break;
                case 'add':
                  this.$refs.modal.add(item._id)
                break;
                case 'remove':
                  // this.$refs.modal.edit(this.filterObj(item),'remove')
                break;
                default:
                  
              }
            },
            handleSaveOk(){},
            handleSaveClose(){},

            // 添加根目录
            addRootMeun(){        
              this.$refs.modal.add(0)
            }
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