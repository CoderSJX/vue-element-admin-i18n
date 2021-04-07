<template>
  <div class="answer-manage-container">
    <element-ui-el-table-draggable>

      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%"
        :highlight-current-row="true"
        :border="true"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :stripe="true"
        fit
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
          prop="aId"
          label="回答ID"
          width="100"
          sortable
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="发布者"
          sortable
          width="150">

        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="name"-->
        <!--          label=""-->
        <!--          sortable-->
        <!--          width="400">-->

        <!--          <template slot-scope="scope">-->
        <!--            <el-popover trigger="hover" placement="top">-->
        <!--              <div style="width: 300px;height: auto">{{ scope.row.content }}</div>-->
        <!--              <div slot="reference" class="name-wrapper" style="cursor: pointer">-->
        <!--                {{ scope.row.header }}-->
        <!--                <el-tag effect="plain" type="success" v-if="scope.row.uName=='匿名'">匿名</el-tag>-->
        <!--              </div>-->
        <!--            </el-popover>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <!--        <el-table-column-->
        <!--          prop="createTime"-->
        <!--          label="发表时间"-->
        <!--          sortable-->
        <!--          width="120">-->
        <!--          <template slot-scope="{row}">-->
        <!--            <div class="">-->
        <!--              <i class="fa fa-calendar-check-o" style="color:#DC0073;"></i>-->
        <!--              {{ row.createTime | getMoment }}-->
        <!--            </div>-->
        <!--          </template>-->

        <!--        </el-table-column>-->
        <el-table-column
          prop="content"
          label="回答内容"
          sortable
          width="400">
          <template slot-scope="{row}">


            {{ row.content | contentForShort }}
          </template>
        </el-table-column>


        <el-table-column
          prop="header"
          label="问题"
          sortable
          width="150">
          <template slot-scope="{row}">


            {{ row.header | contentForShort }}
          </template>
        </el-table-column>
        <el-table-column
          prop="likes"
          label="浏览量"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-eye"></i>
            {{ row.looks }}
          </template>
        </el-table-column>
        <el-table-column
          prop="likes"
          label="点赞数"
          sortable
          width="100">
          <template slot-scope="{row}">

            <i class="fa fa-thumbs-up" ></i>
            {{ row.likes }}
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="copyright"-->
<!--          label="版权声明"-->
<!--          width="150">-->
<!--          <template slot-scope="{row}">-->

<!--            <i v-if="row.copyright ==1" class="fa fa-copyright" style="color: blue;font-size: 14px">copyright</i>-->

<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="updateTime"
          label="最后更新"
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
          label="操作"
          width="">
          <template slot-scope="{row}">


            <el-button slot="reference" type="" style="margin-top: 2px" @click="showContent(row.content)">查看内容
            </el-button>
            <el-button type="danger" style="margin-top: 2px">重置</el-button>

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

    <div class="content" v-show="answerContentDisplay">

      <div id="answer-content-viewer" class="content-viewer">
        <div class="viewer-header">
          <h4>完整内容</h4>
          <i class="fa fa-close" @click="answerContentDisplay=false" style="cursor: pointer;font-size: 18px"></i>
        </div>
        <el-divider></el-divider>
        <div class="viewer-content">

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css' // codemirror
import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content

import Viewer from 'tui-editor/dist/tui-editor-Viewer'
import {fetchAnswerList} from "@/api/answer"
import {getMoment} from "@/utils/date-filter";
import {contentForShort} from "@/filters"

export default {
  filters: {
    getMoment, contentForShort
  },
  data() {
    return {
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      answerContentDisplay: false,
      viewer: null
    }
  },
  methods: {
    showContent(content) {
      this.answerContentDisplay = true;
      this.viewer.setValue(content)
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    getList() {
      this.loadingList = true;
      fetchAnswerList().then(res => {
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
    this.viewer = new Viewer({
      el: document.querySelector('#answer-content-viewer')
    });
  }
}
</script>

<style scoped>
.answer-manage-container {
  padding: 20px;
}
/deep/ .el-divider{
  margin: 0;
}

.content-viewer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  height: 500px;
  margin: auto;
  z-index: 1999;
  background: #ffffff;
  color: black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
  padding: 20px;
  overflow: auto;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>
