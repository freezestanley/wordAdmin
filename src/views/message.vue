<template>
  <div>
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-date-picker type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="截止时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
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
        <el-table-column prop="comment" label="信息内容"></el-table-column>
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
  </div>
</template>

<script>
import { IMESSAGEGET} from '@/api'
export default {
  data() {
    return {
      searchData: {
      },
      loading: false,
      tableData: null,
      currentRow: {},
      paging: {
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    // this.tableData = [{
    //   id: '001',
    //   message: '产品A会从一种状态转变（transition）到另一种状态',
    // }, {
    //   id: '002',
    //   message: '除了为每个事件和状态单独指定回调函数，还可以为所有的事件和状态指定通用的回调函数。',
    // }, {
    //   id: '003',
    //   message: '在“两个一百年”奋斗目标的战略蓝图指引下，开启新时代的中国，正在阔步迈向网络强国的新征程',
    // }];
    this.init()
  },
  methods: {
    init () {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IMESSAGEGET}?posionId=999999`).then(res => {
        if (res.data.status) {
          this.tableData = res.data.data
        } else {
          this.$toast.show({'text': `${res.data.errorMsg}`})
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    levelFormatter(row, column, cellValue) {
      const state = this.state.filter(it => it.value === cellValue);
      return state[0].label;
    },
    query() {
    },
    reset() {
      this.$refs.searchData.resetFields();
    },
    handleQuery() {
      this.loading = true;
    },
    handleSizeChange(val) {
      this.paging.pageSize = val;
      this.handleQuery();
    },
    handleCurrentChange(val) {
      this.paging.currentPage = val;
      this.handleQuery();
    },
    handleCurrentChangeTable(val) {
      if (!val) {
        this.currentRow = {};
      } else {
        this.currentRow = val;
      }
    }
  },
};
</script>

<style scoped>
</style>
