<template>
  <div class="home">
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover" class="day">
          <div class="title">每日浏览：</div>
          <div>每日pv: {{dpv}} 次</div>
          <div>每日uv: {{duv}} 次</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover"  class="month">
          <div class="title">每周浏览：</div>
          <div>每周pv: {{wpv}} 次</div>
          <div>每周uv: {{wuv}} 次</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover"  class="search">
          <div class="title">每月浏览：</div>
          <div>每月pv: {{mpv}} 次</div>
          <div>每月uv: {{muv}} 次</div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <div class="title">Banner管理</div>
      <ul class="bannerlist">
        <li v-for="(item, index) in bannerlist">
          <div>
            <img :src="item.base64Pict" class="bannerbox"/>
            <span style="text-align: center;">{{item.pictDesc}}</span>
            <a style="text-align: center;font-size:12px;" @click="deleteHandler(item.id)">删除</a>
          </div>
        </li>
        <li>
          <div class="addBanner" @click="addBanner">
            <div class="hen"></div>
            <div class="shu"></div>
          </div>
        </li>
      </ul>


      <el-dialog title="新增banner" :visible.sync="dialogShow" width="400px" class="addUser">
        <el-form :model="form" label-width="110px">
          <el-form-item label="上传banner">
            <input ref="uploadimg" id="uploadimg" type="file" accept="image/gif, image/jpeg, image/png, image/jpg" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input maxlength="11" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center;font-size:12px;">只接受png/jpg 图片文件,请控制在300kb以内</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancalhandle">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </div>
</template>

<script>
import { IHOME, IBANNERGET, IBANNERGETDELETE, IBANNERGETADD} from '@/api'
export default {
  data() {
    return {
      dpv:0,
      duv:0,
      mpv:0,
      muv:0,
      wpv:0,
      wuv:0,
      bannerlist: [],
      dialogShow: false,
      form: {
        username: null,
        password: null
      },
      bannerBase: null,
      bannerDesc: null
    };
  },
  created () {
    let load = this.$loading({ fullscreen: true })
    this.axios.post(IHOME).then(res => {
      if (res.data.status) {
        this.mpv = res.data.data.month.pv
        this.muv = res.data.data.month.pv
        this.wpv = res.data.data.week.pv
        this.wuv = res.data.data.week.pv
        this.dpv = res.data.data.day.pv
        this.duv = res.data.data.day.pv
      } else {
        this.$toast.show({'text': `${res.data.errorMsg}`})
      }
      load.close()
      this.getBanner()
    }).catch(err => {
      throw new Error(err)
    })
  },
  methods: {
    getBanner () {
      let load = this.$loading({ fullscreen: true })
      this.axios.post(IBANNERGET).then(res => {
        if (res.data.status) {
          this.bannerlist = res.data.data
        } else {
          this.$toast.show({'text': `${res.data.errorMsg}`})
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    addBanner () {
      this.dialogShow = true
    },
    submit () {
      debugger
      console.log(this.$refs.uploadimg.files)
      var _self = this
      var reader = new FileReader();
      reader.onload = function(e){
        _self.bannerBase = reader.result
        let load = _self.$loading({ fullscreen: true })
        _self.axios.post(IBANNERGETADD, {Base64Pict: _self.bannerBase, pictDesc: _self.bannerDesc}).then(res => {
          if (res.data.status) {
            _self.bannerlist = res.data.data
          } else {
            _self.$toast.show({'text': `${res.data.errorMsg}`})
          }
          load.close()
        }).catch(err => {
          throw new Error(err)
        })
      }  
      reader.readAsDataURL(this.$refs.uploadimg.files[0])
      // let load = this.$loading({ fullscreen: true })
      // this.axios.post(IBANNERGETADD).then(res => {
      //   if (res.data.status) {
      //     this.bannerlist = res.data.data
      //   } else {
      //     this.$toast.show({'text': `${res.data.errorMsg}`})
      //   }
      //   load.close()
      // }).catch(err => {
      //   throw new Error(err)
      // })
    },
    deleteHandler (id) {
      let load = this.$loading({ fullscreen: true })
      this.axios.post(IBANNERGETDELETE).then(res => {
        if (res.data.status) {
          this.bannerlist = res.data.data
        } else {
          this.$toast.show({'text': `${res.data.errorMsg}`})
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    cancalhandle () {
      this.dialogShow = false
    }
  }
};
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
.home{

  .day {
    background:#eee;
    line-height: 30px;
  }
  .month {
    background: #eee;
    line-height: 30px;
  }
  .search {
    background: #eee;
    line-height: 30px;
  }
  .el-col{margin-bottom: 10px;}
  .title{
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
  }
  .bannerlist{
    display: block;
    margin: 0 10px 0;
    padding: 0;
    .addBanner{
      border-radius: 5px;
      border:1px solid #51aaf6;
      width: 50px;
      height: 50px;
      .hen{
        width:20px;
        height:6px;
        position: relative;
        top: 50%;
        left: 50%;
        margin: -3px -10px;
        display: block;
        overflow: hidden;
        background:#51aaf6;
      }
      .shu{
        width: 6px;
        height: 20px;
        margin: -12px -3px;
        position: relative;
        left: 50%;
        top: 50%;
        display: block;
        overflow: hidden;
        background: #51aaf6;
      }
    }
    li {
      display: inline-block;
      position: relative;
      vertical-align: top;
      margin-right: 10px;
      img{
        width: 150px;
        height: 150px;
        border-radius: 5px;
      }
      span,a {
         display: block;
         text-align: center;
         line-height: 20px;
      }
    }
  }
}
</style>