<template>
  <div class="comment-manage-container">
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
        <!--      <el-table-column-->
        <!--        type="index"-->
        <!--        label="序号"-->
        <!--        width="60"-->
        <!--      >-->
        <!--      </el-table-column>-->

        <el-table-column
          prop="cId"
          label="评论ID"
          width="100"
          sortable
        >
        </el-table-column>


        <el-table-column
          prop="name"
          label="评论者"
          sortable
          width="120">


        </el-table-column>

        <el-table-column
          prop="createTime"
          label="发表时间"
          sortable
          width="120">
          <template slot-scope="{row}">
            <div class="">
              <i class="el-icon-time" style="color:#DC0073;"></i>
              {{ row.createTime | getMoment }}
            </div>
          </template>

        </el-table-column>
        <el-table-column
          prop="valid"
          label="状态"
          sortable
          width="80">
          <template slot-scope="scope">

            <div slot="reference">
              <el-tag effect="light" :type="scope.row.valid==1?'primary':'warning'" size="medium">{{
                  scope.row.valid == 1 ? '正常' : '已重置'
                }}
              </el-tag>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
        >


        </el-table-column>

        <el-table-column
          prop="likes"
          label="点赞数"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-thumbs-up"></i>
            {{ row.likes }}
          </template>
        </el-table-column>


        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="{row}">
            <div class="">
                <el-button type="warning">重置</el-button>
            </div>

          </template>
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
import {fetchCommentList} from "@/api/comment"
import {getMoment} from "@/utils/date-filter";

export default {
  filters: {
    getMoment
  },
  data() {
    return {
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
      fetchCommentList().then(res => {
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
.comment-manage-container {
  padding: 20px;
}


</style>
