import { Menu, Icon } from 'ant-design-vue'

const { Item, SubMenu } = Menu

export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  methods: {
    handlePlus (item,k,p) {
      //console.log('item,k,p: ', item,k,p);
      this.$emit('add', item,k,p)
    },
    dropdownPlus(item,it){
      this.$emit('edit',Object.assign(item,it))
    },
    // handleTitleClick (...args) {
    //   this.$emit('titleClick', { args })
    // },
    renderIcon (icon) {
      return icon && (<Icon type={icon} />) || null
    },
    renderMenuItem (item) {
      return (
        <Item key={item.key}>
          { this.renderIcon(item.icon,item) }
          <a-dropdown>
              <span>{ item.title } 
                <a-icon style="margin-left:20px;" type="form" /> 
              </span>
              <a-menu slot="overlay" {...{ on: { click: (it) => this.dropdownPlus(item,it) } }}>
                <a-menu-item key="edit">编辑</a-menu-item>
                <a-menu-item key="remove">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
        </Item>
      )
    },
    renderItem (item) {
      return item.children || item.parent_id=='0' ? this.renderSubItem(item, item.key) : this.renderMenuItem(item, item.key)
    },
    renderSubItem (item, key) {
      const childrenItems = item.children && item.children.map(o => {
        return this.renderItem(o, o.key)
      })

      const title = (
        <span slot="title">
          { this.renderIcon(item.icon) }
          <a-dropdown>
              <span>{ item.title } 
                <a-icon style="margin-left:20px;" type="form" /> 
              </span>
              <a-menu slot="overlay" {...{ on: { click: (it) => this.dropdownPlus(item,it) } }}>
                <a-menu-item key="add">新增</a-menu-item>
                <a-menu-item key="edit">编辑</a-menu-item>
                <a-menu-item key="remove">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
        </span>
      )
      // titleClick={this.handleTitleClick(item)}
      return (
        <SubMenu key={key}>
          { title }
          { childrenItems }
        </SubMenu>
      )
    }
  },
  render () {
    const { dataSource } = this.$props

    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </Menu>
      </div>
    )
  }
}
