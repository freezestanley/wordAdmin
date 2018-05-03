<template>
  <div class="layout">
    <div class="layout-menu">
      <el-menu
        ref="menu"
        text-color="#C0C4C8"
        active-text-color="#FFFFFF"
        :unique-opened="true"
        :default-active="$route.path"
        router>
        <template v-for="item in routes" v-if="!item.hiddle">
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="'/' + child.path">
            <span>{{child.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
      <div class="logo">
          <span>SCDC毒物数据库</span>
        </div>
    </div>
    <div class="layout-main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import routes from '../routes';

export default {
  name: 'layout',
  data() {
    return {
      routes,
    };
  },
};
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
.logo{

}
</style>
