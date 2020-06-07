import { mapState } from 'vuex'

const mixin = {
    computed: {
      ...mapState({
          layoutMode: state => state.app.layout,
          fixedHeader: state => state.app.fixedHeader,
          sidebarOpened: state => state.app.sidebar,
      })
    },
    methods: {
        isTopMenu () {
          return this.layoutMode === 'topmenu'
        },
        isSideMenu () {
          return !this.isTopMenu()
        }
    }
}
export { mixin }