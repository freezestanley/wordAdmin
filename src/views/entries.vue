<template>
  <div>
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
        <el-table-column prop="entry" label="词条"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="delete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.totalPage">
      </el-pagination>
    </el-row>
    <el-dialog title="新建账户" :visible.sync="dialogShow" width="35%">
      <el-form :model="form" label-width="110px">
        <el-form-item label="账户">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input maxlength="11" v-model="form.phoneNo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      },
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      this.tableData = [{
        id: 1,
        entry: '这是一个词条',
      }];
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
    },
    delete() {
    },
  },
};
</script>

<style scoped>
</style>
