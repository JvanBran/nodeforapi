<template>
    <a-layout :class="['layout', 'desktop']">
        <side-menu
            mode="inline"
            :menus="menus"
            theme="dark"
            :collapsed="collapsed"
            :collapsible="true"
            >
        </side-menu>
        <a-layout :class="['sidemenu', 'content-width-Fixed']" :style="{ paddingLeft: '0px', minHeight: '100vh' }">
            <!-- layout header -->
            <global-header
                mode="sidemenu"
                :menus="menus"
                theme="dark"
                :collapsed="collapsed"
                device="desktop"
                @toggle="toggle"
            />

            <!-- layout content -->
            <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: '64px' }">
                <multi-tab></multi-tab>
                <transition name="page-transition">
                <route-view />
                </transition>
            </a-layout-content>

            <!-- layout footer -->
            <a-layout-footer>
                <global-footer />
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import { triggerWindowResizeEvent } from '@/util/util'
    import { mapState, mapActions } from 'vuex';
    import {mixin} from '@/util/mixin'
    import {SideMenu,GlobalHeader,GlobalFooter,MultiTab} from '@/components'
    import RouteView from './RouteView'
    export default {
        data(){
            return{
                collapsed:false,
                menus: []
            }
        },
        mixins:[mixin],
        components: {
            SideMenu,GlobalHeader,GlobalFooter,RouteView,MultiTab
        },
        created () {
            this.menus = this.mainMenu.find(item => item.path === '/').children
            //this.menus = this.$router.options.routes.find(item => item.path === '/').children
            //this.collapsed = !this.sidebarOpened
        },
        computed: {
            ...mapState({
                // 动态主路由
                mainMenu: state => state.asyncRouter.addRouters
            }),
        },
        watch: {
            sidebarOpened (val) {
                this.collapsed = !val
            }
        },
        methods: {
            ...mapActions(['setSidebar']),
            menuSelect () {
            },
            toggle(){
                this.collapsed = !this.collapsed
                this.setSidebar(!this.collapsed)
                triggerWindowResizeEvent()
            },
        }
    }
</script>

<style lang="less">
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
