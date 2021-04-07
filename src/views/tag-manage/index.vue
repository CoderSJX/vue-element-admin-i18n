<template>
  <div class="tag-manage-container">

    <div class="function-container">
      <el-button type="primary">新增</el-button>
      <el-button type="danger" @click="confirmDialog=true">批量删除</el-button>

    </div>
    <el-dialog
      title="提示"
      :visible.sync="confirmDialog"
      width="30%"
      :before-close="handleClose">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="confirmDialog = false">取 消</el-button>
    <el-button type="primary" @click="confirmDialog = false">确 定</el-button>
  </span>
    </el-dialog>
    <element-ui-el-table-draggable>

      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :highlight-current-row="true"
        :border="true"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :stripe="true"
        :v-loading="listLoading"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="id"
          label="标签ID"
          width="100"
          sortable
        >
        </el-table-column>


        <el-table-column
          prop="name"
          label="标签名"
          sortable
          width="150">


        </el-table-column>
        <el-table-column
          prop="quote"
          label="引用次数"
          sortable
          width="150">

        </el-table-column>

      </el-table>
    </element-ui-el-table-draggable>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
import {fetchTagList} from "@/api/tag"
import {getMoment} from "@/utils/date-filter";

export default {
  filters: {
    getMoment
  },
  data() {
    return {
      confirmDialog: false,

      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    getList() {
      this.loadingList = true;
      fetchTagList().then(res => {
          this.tableData = res.data
        }
      )
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>
.tag-manage-container {
  padding: 20px;
}


.function-container {
  margin-bottom: 10px;
}
</style>
