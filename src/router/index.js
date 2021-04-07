import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: 'dashboard', icon: 'dashboard', affix: true}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/user-manage',
    children: [
      {
        path: 'user-manage',
        component: () => import('@/views/user-manage/index'),
        name: 'user-manage',
        meta: {title: '用户管理', icon: 'el-icon-user'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/question-manage',
    children: [
      {
        path: 'question-manage',
        component: () => import('@/views/question-manage/index'),
        name: 'question-manage',
        meta: {title: '问题管理', icon: 'el-icon-tickets'}
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/answer-manage',
    children: [
      {
        path: 'answer-manage',
        component: () => import('@/views/answer-manage/index'),
        name: 'answer-manage',
        meta: {title: '回答管理', icon: 'el-icon-reading'}
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/comment-manage',
    children: [
      {
        path: 'comment-manage',
        component: () => import('@/views/comment-manage/index'),
        name: 'comment-manage',
        meta: {title: '评论管理', icon: 'el-icon-chat-square'}
      }
    ]
  },   {
    path: '/',
    component: Layout,
    redirect: '/tag-manage',
    children: [
      {
        path: 'tag-manage',
        component: () => import('@/views/tag-manage/index'),
        name: 'tag-manage',
        meta: {title: '标签管理', icon: 'el-icon-price-tag'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/oss-manage',
    children: [
      {
        path: 'oss-manage',
        component: () => import('@/views/oss-manage/index'),
        name: 'oss-manage',
        meta: {title: 'OSS管理', icon: 'el-icon-folder'}
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/report-manage',
    children: [
      {
        path: 'report-manage',
        component: () => import('@/views/report-manage/index'),
        name: 'report-manage',
        meta: {title: '用户举报处理', icon: 'el-icon-warning'}
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: {title: 'createArticle', icon: 'edit'}
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: {title: 'editArticle', noCache: true, activeMenu: '/example/list'},
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: {title: 'articleList', icon: 'list'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
