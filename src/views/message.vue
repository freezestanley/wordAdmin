<template>
  <div>
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-date-picker type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="截止时间" v-model="dateValue" value-format="yyyyMMdd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandler">查询</el-button>
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
        <el-table-column prop="realname" label="用户姓名"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="deleteHandler(scope.row.id)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
import { IMESSAGEGET, IMESSAGEDELETE} from '@/api'
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
      dateValue: null
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
    searchHandler () {
      let url = (this.dateValue && this.dateValue.length >= 2) ? `${IMESSAGEGET}?posionId=999999&beginDate=${this.dateValue[0]}&endDate=${this.dateValue[1]}` : `${IMESSAGEGET}?posionId=999999`
      let load = this.$loading({ fullscreen: true })
      this.axios.get(url).then(res => {
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
    deleteHandler (id) {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IMESSAGEDELETE}?commentId=${id}`).then(res => {
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