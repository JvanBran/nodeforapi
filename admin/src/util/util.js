const checkForm = {
    methods: {
        handleUsernameOrEmail (rule, value, callback) {
            const { state } = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
              state.loginType = 0
            } else {
              state.loginType = 1
            }
            callback()
        },
    }
}
/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // 判断是否为父级菜单
    if (item.parent_id == parentId) {
      const child = {
        ...item,
        key: item._id,
        children: []
      }
      // 迭代 list， 找到当前菜单相符合的所有子菜单
      listToTree(list, child.children, item._id)
      // 删掉不存在 children 值的属性
      if (child.children.length <= 0) {
        delete child.children
      }
      // 加入到树中
      tree.push(child)
    }
  })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
import {constantRouterMap} from '@/router/router'
const generator = (routerMap) => {
  return routerMap.map(item => {
    const { title,show,hiddenHeaderContent,icon,target } = item || {}
    const currentRouter = {
      // 路由名称，建议唯一
      name: item.name,
      // 如果路由path
      path: item.path,
      // 该路由对应页面的 组件
      component: (constantRouterMap[item.component]),
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
          title: title,
          icon: icon || undefined,
          hiddenHeaderContent: hiddenHeaderContent,
          target: target,
          permission: item.name
      } 
    }
    // 是否设置了隐藏菜单
    if (show === false) {
        currentRouter.hidden = true
    }
    // 是否设置了隐藏子菜单
    if (hiddenHeaderContent) {
      currentRouter.hideChildrenInMenu = true
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // 重定向
    item.redirect && (currentRouter.redirect = {'path':item.redirect})
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children)
    }
    return currentRouter
  })
}
/**
 * 触发 window.resize
 */
const triggerWindowResizeEvent = () => {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}
const timeFix = () => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

const welcome = () => {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

export { checkForm,listToTree,generator,triggerWindowResizeEvent,timeFix,welcome }