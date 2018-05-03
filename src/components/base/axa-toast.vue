<template>
  <div class="axaToast" v-if="isShow">
    <div class="toastBg"></div>
    <div class="text" :style="{width: width+'rem'}">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'axaToast',
  data () {
    return {
      isShow: false,
      width: '10',
      text: ''
    }
  },
  created () {
  },
  computed: {

  },
  props: {
    // options: {
    //   required: true
    // }
  },
  methods: {
    show (options) {
      this.text = options.text || this.text
      this.width = options.width || this.width
      this.isShow = true
      let _self = this
      let time = options.time || 2000
      setTimeout(function () {
        _self.hide()
      }, time)
    },
    hide (options) {
      this.isShow = false
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>



</style>
<style lang='scss' rel="stylesheet/scss">
  .axaToast {
    & > .toastBg {
      width: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9000;
      background-color: rgba(255, 255, 255, 0);
    }
    & > .text{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%);
      text-align: center;
      background-color: rgba(0, 0, 0, .6);
      color: #fff;
      border-radius: 10px;
      z-index: 9000;
      word-wrap: break-word;
      word-break: normal;
      padding: 15px;
    }
  }
</style>
