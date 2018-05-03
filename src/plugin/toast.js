// import tool from './aa'
import Toast from '@/components/base/axa-toast'
import Vue from 'vue'
export default {
  install (Vue, options = {}) {
    const VueToast = Vue.extend(Toast)
    let toast = null
    // function doit () {
    //   return new Promise((resolve) => {
    //     debugger
    //     // 第一次调用
    //     if (!loading) {
    //       loading = new VueLoading()
    //       // 手动创建一个未挂载的实例
    //       loading.$mount()
    //       // 挂载
    //       document.querySelector(options.container || 'body').appendChild(loading.$el)
    //     }
    //     resolve()
    //   })
    // }

    if (!toast) {
      toast = new VueToast()
      // 手动创建一个未挂载的实例
      toast.$mount()
      // 挂载
      document.querySelector(options.container || 'body').appendChild(toast.$el)
    }
    let doit = {}
    doit.hide = (a) => toast.hide(a)
    doit.show = (a) => toast.show(a)

    Vue.toast = Vue.prototype.$toast = doit
  }
}
