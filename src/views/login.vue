<template>
  <div class="login">
    <div class="login_box">
      <div class="title">Welcome to SCDC毒物数据库</div>
    <el-form :model="form" label-width="110px">
        <el-form-item label="用户名">
          <el-input v-model="form.loginName" maxlength="20" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.loginPassword" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {ILOGIN} from '@/api'
export default {
  data() {
    return {
      form: {
        loginName: null,
        loginPassword: null
      }
    };
  },
  created() {
  },
  methods: {
    submit () {
      this.axios.get(`${ILOGIN}?username=${this.form.loginName}&password=${this.form.loginPassword}`).then(response => {
        if (response.data.status) {
          this.$router.push({path: '/home'})
        } else {
          this.$toast.show({'text': `${response.data.errorMsg}`})
        }
      }).catch(err => {
        this.$toast.show({'text': `系统错误请联系管理员`})
        throw new Error(err)
      })
    }
  },
};
</script>
