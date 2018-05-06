<template>
  <div class="information">
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-date-picker type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="截止时间" v-model="dateValue"  value-format="yyyyMMdd"></el-date-picker>
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
        <el-table-column prop="usernick" label="留言作者"></el-table-column>
        <el-table-column prop="replycomment" label="回复"></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="editHandler(scope.row)" type="text" size="small">回复</el-button>
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

    <el-dialog title="回复留言" :visible.sync="dialogShow" width="400px" class="addUser">
      <el-form :model="form" label-width="110px">
        <div class="replayDia">
          <div class="title">{{form.comment}}</div>
          <div class="nickname">{{form.nickname}}</div>
        </div>
        <div>回复</div>
        <el-input type="textarea" v-model="form.desc"></el-input>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalhandle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { IMESSAGEGET, IMESSAGEDELETE, IMESSAGEADD} from '@/api'
import validate from '@/widget/validate'
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
      dateValue: null,
      dialogShow: false,
      form: {
        desc:null,
        comment: null,
        nickname: null,
        id: null
      }
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
      this.axios.get(`${IMESSAGEGET}?posionId=999998`).then(res => {
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
    cancalhandle (obj) {
      this.dialogShow = false
      this.form.comment = null
      this.form.nickname = null
      this.form.desc = null
      this.form.id = null
    },
    editHandler (obj) {
      debugger
      this.dialogShow = true
      this.form.comment = obj.comment
      this.form.nickname = obj.usernick
      this.form.id = obj.id
    },
    submit () {
      if (validate.trimStr(this.form.desc).length <= 0) {
        return this.$toast.show({'text': `请输入您的回复`})
      }
      this.dialogShow = false
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IMESSAGEADD}?replyId=${this.form.id}&posionId=999998&comment=${this.form.desc}`).then(res => {
        if (res.data.status) {
          this.tableData = res.data.data
          this.form.comment = null
          this.form.nickname = null
          this.form.desc = null
          this.form.id = null
        } else {
          this.$toast.show({'text': `${res.data.errorMsg}`})
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    }
  },
};
</script>

<style scoped>

</style>