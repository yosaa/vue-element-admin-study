// import { asyncRoutes, constantRoutes } from '@/router'
import { constantRoutes } from '@/router'
/* Layout */

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
  generateRoutes({ commit }, menu, roles) {
    return new Promise(resolve => {
      // const accessedRoutes = [{
      //   path: '/staff',
      //   component: Layout,
      //   meta: {
      //     title: '员工管理',
      //     icon: 'table'
      //   },
      //   children: [
      //     {
      //       path: 'list',
      //       meta: { title: '员工列表' }
      //     },
      //     {
      //       path: 'add',
      //       meta: { title: '员工添加' }
      //     }
      //   ]
      // }]
      console.log('##############', menu)
      // const accessedRoutes = getMenu(getToken()).then(response => {
      //   const { data } = response
      //   data.map(i => {
      //     i.component = Layout
      //     i.meta = {
      //       title: i.name,
      //       icon: 'table'
      //     }
      //     i.children.map(j => {
      //       j.meta = {
      //         title: j.name
      //       }
      //     })
      //   })
      // })
      const accessedRoutes = menu
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
