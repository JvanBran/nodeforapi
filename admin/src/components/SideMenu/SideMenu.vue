<template>
    <a-layout-sider
    :class="['sider', theme]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">
        <logo />
        <s-menu
            :collapsed="collapsed"
            :menu="menus"
            :theme="theme"
            :mode="mode"
            @select="onSelect"
        style="padding: 16px 0px;">
        </s-menu>
    </a-layout-sider>
</template>

<script>
    import SMenu from './index'
    import Logo from '@/components/tools/Logo'
    export default {
        name: 'SideMenu',
        components: { Logo ,SMenu },
        props: {
            mode: {
                type: String,
                required: false,
                default: 'inline'
            },
            theme: {
                type: String,
                required: false,
                default: 'dark'
            },
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            },
            menus: {
                type: Array,
                required: true
            }
        },
        methods: {
            onSelect (obj) {
            this.$emit('menuSelect', obj)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>