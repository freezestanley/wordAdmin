const layout = () => import('./views/layout.vue');
const home = () => import('./views/home.vue');
const account = () => import('./views/account.vue');
const message = () => import('./views/message.vue');
const entries = () => import('./views/entries.vue');

const routes = [
  {
    path: '/',
    component: layout,
    redirect: 'home',
    children: [
      { path: 'home', name: '首页', component: home },
      { path: 'account', name: '账户管理', component: account },
      { path: 'message', name: '信息管理', component: message },
      { path: 'entries', name: '词条管理', component: entries },
    ],
  },
];

export default routes;
