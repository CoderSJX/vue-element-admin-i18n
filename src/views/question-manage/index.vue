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
        <!--      <el-table-column-->
        <!--        type="selection"-->
        <!--        width="55">-->
        <!--      </el-table-column>-->
        <!--      <el-table-column-->
        <!--        type="index"-->
        <!--        label="序号"-->
        <!--        width="60"-->
        <!--      >-->
        <!--      </el-table-column>-->

        <el-table-column
          prop="qId"
          label="问题ID"
          width="100"
          sortable
        >
        </el-table-column>


        <el-table-column
          prop="header"
          label="标题"
          sortable
          width="400">

          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div style="width: 300px;height: auto">{{ scope.row.content }}</div>
              <div slot="reference" class="name-wrapper" style="cursor: pointer">
                {{ scope.row.header }}
                <el-tag effect="plain" type="success" v-if="scope.row.uName=='匿名'">匿名</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="realName"
          label="发布者"
          sortable
          width="150">
          <template slot-scope="{row}">
            {{ row.realName }}

          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="发表时间"
          sortable
          width="120">
          <template slot-scope="{row}">
            <div class="">
              <i class="fa fa-calendar-check-o" style="color:#DC0073;"></i>
              {{ row.createDate | getMoment }}
            </div>
          </template>

        </el-table-column>
        <el-table-column
          prop="tags"
          label="问题标签"

        >
          <template slot-scope="{row}">
            <div style="display: flex;justify-content: center;height: auto">
              <div class="" v-for="tag in row.tags" :key="tag" style="margin:0 2px;">

                <el-tag effect="dark">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </template>

        </el-table-column>
        <el-table-column
          prop="answers"
          label="回答数"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-comment" style="color: deepskyblue"></i>
            {{ row.answers }}
          </template>
        </el-table-column>
        <el-table-column
          prop="looks"
          label="浏览量"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-eye"></i>
            {{ row.looks }}
          </template>
        </el-table-column>
        <el-table-column
          prop="follows"
          label="关注数"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-star" style="color: red"></i>
            {{ row.follows }}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="{row}">
            <div class="">
              <el-button type="" style="margin-top: 2px">增加曝光</el-button>
              <el-button type="danger" style="margin-top: 2px">封停</el-button>
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
import {fetchQuestionList} from "@/api/question"
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
      fetchQuestionList().then(res => {
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
