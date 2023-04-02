import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/roast' // 重定向
  },
  {
    path: '/roast',
    name: 'Roast',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/Roast/Roast')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../pages/Comment/Comment')
  },
  {
    path: '/private_chat/:otherUID',
    name: 'PrivateChat',
    component: () => import('../pages/PrivateChat/PrivateChat')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../pages/Game/Game')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../pages/Create/Create')
  },
  {
    path: '/interactive_permissions',
    name: 'InteractivePermissions',
    component: () => import('../pages/InteractivePermissions/InteractivePermissions')
  },
  {
    path: '/topic',
    name: 'Topic',
    component: () => import('../pages/Topic/Topic')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../pages/Test/Test'),
  },
  {
    path: '/test_volume',
    name: 'TestVolume',
    component: () => import('../pages/TestVolume/TestVolume'),
  },
  {
    path: '/personal_center',
    name: 'PersonalCenter',
    component: () => import('../pages/PersonalCenter/PersonalCenter')
  },
  {
    path: '/my_attention',
    name: 'MyAttention',
    component: () => import('../pages/MyAttention/MyAttention')
  },
  {
    path: '/account_information',
    name: 'AccountInformation',
    component: () => import('../pages/AccountInformation/AccountInformation')
  },
  {
    path: '/all_creations',
    name: 'AllCreations',
    component: () => import('../pages/AllCreations/AllCreations')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../pages/Message/Message')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/Login')
  },
]

const router = new VueRouter({
  routes
})

export default router
