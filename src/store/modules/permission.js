import { asyncRoutes, constantRoutes } from '@/router'
// import { constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
// import { getMenu } from '@/api/user'
// import { getToken } from '@/utils/auth' // get token from cookie
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = [{
        path: '/table',
        component: Layout,
        redirect: '/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          {
            path: 'dynamic-table',
            component: () => import('@/views/table/dynamic-table/index'),
            name: 'DynamicTable',
            meta: { title: 'Dynamic Table' }
          },
          {
            path: 'drag-table',
            component: () => import('@/views/table/drag-table'),
            name: 'DragTable',
            meta: { title: 'Drag Table' }
          },
          {
            path: 'inline-edit-table',
            component: () => import('@/views/table/inline-edit-table'),
            name: 'InlineEditTable',
            meta: { title: 'Inline Edit' }
          },
          {
            path: 'complex-table',
            component: () => import('@/views/table/complex-table'),
            name: 'ComplexTable',
            meta: { title: 'Complex Table' }
          }
        ]
      }]

      // let accessedRoutes = [
      //   {
      //     component: Layout,
      //     path: "/staff",
      //     icon: "icon-staff",
      //     name: "员工管理",
      //     id: 3,
      //     children_ids: [15, 16],
      //     meta: {
      //       title: 'Table',
      //       icon: 'table'
      //     },
      //     children: [{
      //       id: 15,
      //       path: "/staff/list",
      //       name: "员工列表"
      //     },
      //     {
      //       id: 16,
      //       path: "/staff/add",
      //       name: "员工添加"
      //     }]
      //   }]
      // let menu = new Promise((resolve, reject) => {
      //   getMenu(getToken()).then(response => {
      //     const { data } = response
      //     resolve(data)
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
      // menu.map(i => {
      //   i.meta = {
      //     title: 'Table',
      //     icon: 'table'
      //   }
      // })
      // let accessedRoutes
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
