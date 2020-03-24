<template>
    <div class="ant-pro-multi-tab">
        <div class="ant-pro-multi-tab-wrapper">
            <a-tabs
                hideAdd
                type="editable-card"
                v-model="activeKey"
                :tabBarStyle="{background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px'}"
                @edit="onEdit"
                >
                <a-tab-pane
                    :style="{ height: 0 }"
                    v-for="item in pages"
                    :key="item.fullPath" 
                    :closable="pages.length > 1"
                >
                    <a-dropdown slot="tab" :trigger="['contextmenu']">
                        <span>{{item.meta.title}}</span>
                        <a-menu slot="overlay" @click="(e)=>{closeMenuClick(e,item.fullPath)}">
                            <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
                            <a-menu-item key="closeRight">关闭右侧</a-menu-item>
                            <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
                            <a-menu-item key="closeAll">关闭全部</a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-tab-pane>
            </a-tabs>  
        </div>
      </div>
</template>
<script>
// import events from './events'

export default {
  name: 'MultiTab',
  data () {
    return {
      fullPathList: [],
      pages: [],
      activeKey: '',
      newTabIndex: 0
    }
  },
  created () {
    this.pages.push(this.$route)
    this.fullPathList.push(this.$route.fullPath)
    this.selectedLastPath()
  },
  methods: {
    remove (targetKey) {
      this.pages = this.pages.filter(page => page.fullPath !== targetKey)
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    onEdit(targetKey,action){
        this[action](targetKey)
    },
    closeMenuClick(item,router){
        this[item.key](router)
    },
    selectedLastPath () {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
    },
    // content menu
    closeThat (e) {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (this.fullPathList.length > 1) {
        this.remove(e)
      } else {
        this.$message.info('这是最后一个标签了, 无法被关闭')
      }
    },
    closeLeft (e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info('左侧没有标签')
      }
    },
    closeRight (e) {
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex < (this.fullPathList.length - 1)) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.remove(item)
          }
        })
      } else {
        this.$message.info('右侧没有标签')
      }
    },
    closeAll (e) {
      const currentIndex = this.fullPathList.indexOf(e)
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.remove(item)
        }
      })
    },
  },
  watch: {
    '$route': function (newVal) {
        this.activeKey = newVal.fullPath
        if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
            this.fullPathList.push(newVal.fullPath)
            this.pages.push(newVal)
        }
    },
    activeKey: function (newPathKey) {
      this.$router.push({ path: newPathKey })
    }
  }
}
</script>
<style lang="less">
.ant-pro-multi-tab {
  margin: -23px -24px 24px -24px;
  background: #fff;
}

.topmenu .ant-pro-multi-tab-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.topmenu.content-width-Fluid .ant-pro-multi-tab-wrapper {
  max-width: 100%;
  margin: 0 auto;
}
</style>