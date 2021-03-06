const layout = () => import('./views/layout.vue');
const home = () => import('./views/home.vue');
const account = () => import('./views/account.vue');
const message = () => import('./views/message.vue');
const entries = () => import('./views/entries.vue');
const information = () => import('./views/information.vue');
const login = () => import('./views/login.vue');
const drug = () => import('./views/drug.vue');
const routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    component: layout,
    redirect: 'home',
    children: [
      { path: 'home', name: '首页', component: home },
      { path: 'account', name: '账户管理', component: account },
      { path: 'information', name: '词条留言', component: information },
      { path: 'message', name: '客服留言', component: message },
      // { path: 'type', name: '毒物管理', component: drug },
      { path: 'entries', name: '词条管理', component: entries },
    ],
  }
];

export default routes;
