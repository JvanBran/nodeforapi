<template>
    <a-card :bordered="false">
        <a-row :gutter="24">
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
    </a-card>
</template>

<script>
    import {TreeList} from '@/components'
    console.log('sTree: ', TreeList);
    export default {
        data(){
            return{
                openKeys: ['key-01'],
                orgTree:[
                {
                    'key': 'key-01',
                    'title': '系统管理',
                    'icon': 'database',
                    'children': [
                        {
                            'key': 'key-01-01',
                            'title': '系统编辑管理',
                            'icon': null,
                        }, 
                        {
                            'key': 'key-01-02',
                            'title': '菜单权限配置',
                            'icon': null
                        }
                    ]
                }, 
                {
                    'key': 'key-02',
                    'title': '权限编辑',
                    'icon': 'form',
                    'children': [
                        {
                        'key': 'key-02-01',
                        'title': '用户权限编辑',
                        'icon': null
                        }, {
                        'key': 'key-02-02',
                        'title': '角色权限编辑',
                        'icon': null
                        }, {
                        'key': 'key-02-03',
                        'title': '三级菜单',
                        'icon': null,
                        'children': [
                            {
                                'key': 'key-02-03-01',
                                'title': '财务制度建设',
                                'icon': null
                            },
                            {
                                'key': 'key-02-03-02',
                                'title': '会计核算',
                                'icon': null
                            }
                        ]
                    }]
                }
                ]
            }
        },
        components:{
            TreeList
        },
        created(){
            console.log(this.$route.fullPath)
        },
        methods: {
            handleClick (e) {
                console.log('e: ', e);
            },
            handleAdd (item) {
                console.log('item: 11', item);
            },
            handleTitleClick(item){
                console.log('item: ', item);
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