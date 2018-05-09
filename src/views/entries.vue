<template>
  <div class="entries_box">
    <el-row>
      <el-form :model="searchData" ref="searchData" :inline="true">
        <el-form-item>
          <el-input v-model="searchData.entry" placeholder="词条" clearable auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandler">查询</el-button>
          <el-button @click="searchData.entry = null">重置</el-button>
          <el-button @click="showDialog">新建</el-button>
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
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="casNo" label="casNo"></el-table-column>
        <el-table-column prop="category" label="类型"></el-table-column>
        <el-table-column align="center" label="操作" width="120">
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
    <el-dialog title="添加词条" :visible.sync="dialogShow" width="35%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="casNo">
          <el-input v-model="form.casNo" placeholder="casNo" maxlength="30" clearable auto-complete="off"/>
        </el-form-item>
        <el-form-item label="选择类别">
          <el-select v-model="form.region" placeholder="请选择词条类别">
            <template v-for="(item,index) in category" keys="index">
              <el-option :label="item.category" :value="item.categoryEn"></el-option>
            </template>
          </el-select>
        </el-form-item>

        
        <input ref="uploadimg" id="uploadimg" type="file" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        <!-- <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { IWORDLISTGET, ICATEGORY, IWORDREMOVE, IWORDADD } from '@/api'
import validate from '@/widget/validate'
export default {
  data() {
    return {
      record: [{}, {}],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
      category: null,
      form: {
        entry: '',
        region: null,
        casNo: null
      },
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory () {
      let load = this.$loading({ fullscreen: true })
      this.axios.post(`${ICATEGORY}`).then(res => {
        if (res.data.status) {
          this.category = res.data.data
          this.query()
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    query() {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IWORDLISTGET}?replyId=${this.form.id}&posionId=999998&comment=${this.form.desc}`).then(res => {
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
    },
    searchHandler () {
      let keyword = validate.trimStr(this.searchData.entry)
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IWORDSEARCH}?keyword=${keyword}`).then(res => {
        if (res.data.status) {
          this.tableData = res.data.data
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    deleteHandler(id) {
      let load = this.$loading({ fullscreen: true })
      this.axios.get(`${IWORDREMOVE}?id=${id}`).then(res => {
        if (res.data.status) {
          this.tableData = res.data.data
        }
        load.close()
      }).catch(err => {
        throw new Error(err)
      })
    },
    showDialog () {
      this.dialogShow = true
      this.form.casNo = null
    },
    submitHandler () {
      let formdata = new FormData();
      formdata.append('file',this.$refs.uploadimg.files[0]);
      formdata.append('action','test');
      formdata.append('type',this.form.region);
      formdata.append('casNo',this.form.casNo);
      this.axios({
          url: IWORDADD,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then( res => {
        this.dialogShow = false
        this.form.casNo = null
        if (res.data.status) {
          this.tableData = res.data.data
        }
      })
    }
  },
};
</script>