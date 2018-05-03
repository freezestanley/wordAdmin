<template>
  <div>
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-input v-model="searchData.keyword" placeholder="关键字" maxlength="10" clearable auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryUser">查询</el-button>
          <el-button  @click="queryUserReset">重置</el-button>
          <el-button @click="openDia">新建</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        ref="tableData"
        v-loading="loading"
        element-loading-text="加载中"
        highlight-current-row
        fit
        border
        stripe
        style="width:100%">
        <el-table-column type="index" width="35" align="center" label="序"></el-table-column>
        <el-table-column align="center" prop="id" label="用户id"></el-table-column>
        <el-table-column align="center" prop="username" label="姓名"></el-table-column>
        <el-table-column align="center" prop="userType" label="身份"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="editHandler(scope.row)" type="text" size="small">修改密码</el-button>
            <el-button @click="deleteHandler(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.totalPage">
      </el-pagination> -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @current-change = "changePage"
        @prev-click = "changePage"
        @next-click = "changePage"
        :total="paging.pageSize">
      </el-pagination> -->
    </el-row>
    <el-dialog :title="diastate == 1 ? '新建账户' : '修改账户'" :visible.sync="dialogShow" width="400px" class="addUser">
      <el-form :model="form" label-width="110px">
        <el-form-item label="姓名">
          <el-input v-model="form.username" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input maxlength="11" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-radio v-model="form.userType" label="USER">会员</el-radio>
          <el-radio v-model="form.userType" label="ADMIN">管理员</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalhandle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { IACCOUNT, IADDACCOUNT, IACCOUNTADD, IACCOUNTDELETE } from '@/api'
export default {
  data() {
    return {
      searchData: {
        keyword: ''
      },
      diastate: 1,
      loading: false,
      tableData: null,
      paging: {
        currentPage: 1,
        pageSize: 200,
      },
      dialogShow: false,
      form: {
        userType: null,
        username: null,
        password: null,
      },
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(IACCOUNT).then(res => {
        load.close()
        // res.data = {
        //   status: 'true',
        //   errorMsg: '警告哦，这是一条警告消息',
        //   data: {
        //     tableData: [{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   }]
        //   }
        // }
        if (res.data.status) {
          this.tableData = res.data.data
        } else {
          // this.$toast.show({'text': res.data.errorMsg})
          this.$message({
            message: res.data.errorMsg,
            type: 'warning'
          })
        }
      }).catch(err => {
        throw new Error(err)
      })
    },
    submit () {
      if (!this.form.username || !this.form.userType || !this.form.password){
        this.$toast.show({'text': '请正确填写用户信息'})
        return
      }
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IACCOUNTADD}?username=${this.form.username}&userType=${this.form.userType}&password=${this.form.password}`).then(res => {
        this.dialogShow = false
        load.close()
        if (res.data.status == 'true') {
          this.tableData = dt.data.data
        } else {
          this.$toast.show({'text': res.data.errorMsg})
          // this.$message({
          //   message: res.data.errorMsg,
          //   type: 'success'
          // })
        }
      }).catch(err => {
        throw new Error(err)
      })
    },
    queryUser () {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IACCOUNT}?keyword=${this.searchData.keyword}`).then(res => {
        load.close()
        // res.data = {
        //   status: 'true',
        //   errorMsg: '警告哦，这是一条警告消息',
        //   data: {
        //     tableData: [{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   },{
        //     id: 1,
        //     account: 'Junyi',
        //     username: '俊毅',
        //     phoneNo: '15610901090',
        //   }]
        //   }
        // }
        // let dt = res.data
        if (res.data.status) {
          this.tableData = res.data.data
        } else {
          this.$toast.show({'text': res.data.errorMsg})
          // this.$message({
          //   message: res.data.errorMsg,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        throw new Error(err)
      })
    },
    cancalhandle() {
      this.dialogShow = false
    },
    changePage (e) {
      console.log(e)
      this.paging.currentPage = e
    },
    queryUserReset() {
      this.searchData.queryUser = '';
    },
    editHandler (obj) {
      this.openDia()
      this.diastate = 2
      this.form.username = obj.username
      this.form.password = obj.password
      this.form.userType = obj.userType
    },
    openDia () {
      this.diastate = 1
      this.dialogShow = true
      this.form.username = null
      this.form.password = null
      this.form.userType = null
    },
    deleteHandler (id) {
      debugger
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IACCOUNTDELETE}?id=${this.searchData.keyword}`).then(res => {
        load.close()
        if (res.data.status) {
          this.tableData = res.data.data
        } else {
          this.$toast.show({'text': res.data.errorMsg})
        }
      })
    }
  },
};
</script>

<style scoped>
</style>
