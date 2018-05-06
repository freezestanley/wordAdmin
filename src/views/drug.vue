<template>
  <div class="drug">
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-input v-model="searchData.entry" placeholder="词条" clearable auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
          <el-button @click="dialogShow = true">新建</el-button>
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
        <el-table-column prop="category" align="center" label="类型"></el-table-column>
        <el-table-column prop="categoryDesc" align="center" label="描述"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="delete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @current-change = "changePage"
        @prev-click = "changePage"
        @next-click = "changePage"
        :total="paging.pageSize">
      </el-pagination> -->
    </el-row>
    <el-dialog title="新建类型" :visible.sync="dialogShow" width="470px">
      <el-form :model="form" label-width="110px">
        <el-form-item label="类型名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="form.nameEn"></el-input>
        </el-form-item>
        <el-form-item label="类型描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入类型描述"
            v-model="form.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHandler">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { IDRUGLISTGET, ICATEGORYADD } from '@/api'
export default {
  data() {
    return {
      searchData: {
        entry: '',
      },
      loading: false,
      tableData: null,
      paging: {
        currentPage: 1,
        pageSize: 10,
      },
      dialogShow: false,
      form: {
        entry: '',
        name: null,
        desc: null,
        nameEn: null
      },
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      let load = this.$loading({ fullscreen: true })
      this.axios.post(IDRUGLISTGET).then(res => {
        if (res.data.status) {
          this.tableData = res.data.data
        } else {
          this.$toast.show({'text': `${res.data.errorMsg}`})
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
      // this.tableData = [{
      //   id: 1,
      //   entry: '这是一个词条',
      // }];
    },
    reset() {
      this.$refs.searchData.resetFields();
    },
    handleSizeChange(val) {
      this.paging.pageSize = val;
      this.query();
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.query();
    },
    edit(idx, row) {
      console.log(idx, row);
      this.dialogShow = true;
      this.form.name = row.category
      this.form.desc = row.categoryDesc
      this.form.nameEn = row.categoryEn
      this.submitHandler(row.id)
    },
    delete() {
    },
    cancelHandler () {
      this.dialogShow = false
      this.form.name = null
      this.form.desc = null
      this.form.nameEn = null
    },
    submitHandler (id) {
      this.dialogShow = false
      if (!this.form.name || !this.form.desc || !this.form.nameEn) {
        this.$toast.show({'text': `请输入相关信息`})
      } else {
        this.axios.post(ICATEGORYADD, {category: this.form.name, categoryEn: this.form.nameEn,  categoryDesc: this.form.desc, id}).then(res => {
          if (res.data.status) {
            this.tableData = res.data.data
          } else {
            this.$toast.show({'text': `${res.data.errorMsg}`})
          }
          load.close()
        }).catch(err => {
          throw new Error(err)
        })
      }
    }
  },
};
</script>

<style scoped>
.drug .el-form-item .el-input--small {
  font-size: 14px !important;
  width: 300px !important;
}
</style>
