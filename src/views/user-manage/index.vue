<template>
  <div class="user-manage-container">
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
        <el-table-column
          type="index"
          label="序号"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="uid"
          label="用户ID"
          width="100"
          sortable
        >
        </el-table-column>

        <el-table-column
          prop="header"
          label="用户头像"

          width="100"
        >
          <template slot-scope="scope">

            <div slot="reference" style="display: flex;justify-content: center">
              <div class="img-box" style="width: 48px;height: 48px">
                <img :src="scope.row.header" alt="" style="width: 100%;height: 100%">
              </div>

            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户昵称"
          sortable
          width="180">
        </el-table-column>

        <el-table-column
          prop="valid"
          label="账号状态"
          sortable
          width="120">
          <template slot-scope="scope">

            <div slot="reference">
              <el-tag effect="light" :type="scope.row.valid==1?'primary':'danger'" size="medium">{{
                  scope.row.valid == 1 ? '正常' : '封禁'
                }}
              </el-tag>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"

          width="80">

          <template slot-scope="scope">

            <div slot="reference">
              <i :class="scope.row.sex!='女'?'el-icon-male male':'el-icon-female female'"></i>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          sortable
          width="120">
          <template slot-scope="{row}">
            {{ row.createTime | getMoment }}
          </template>

        </el-table-column>
        <el-table-column
          prop="authorizedName"
          label="认证"

          width="150">
          <template slot-scope="scope">

            <div slot="reference">
              <div v-if="scope.row.authorizedName">
                {{ scope.row.authorizedName }}
                <i style="color: blue" class="el-icon-circle-check"></i>
              </div>
              <div class="" v-else>
                未认证
              </div>
            </div>

          </template>

        </el-table-column>
        <el-table-column
          prop="work"
          label="职业"

          width="120">
        </el-table-column>
        <el-table-column
          prop="education"
          label="教育经历"

          width="200">
        </el-table-column>
        <el-table-column
          prop="city"
          label="居住城市"

          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="{row}">
            <el-button size="small" type="danger" v-if="row.valid==1">封禁</el-button>
            <el-button size="small" type="primary" v-else>解封</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    </element-ui-el-table-draggable>
  </div>
</template>

<script>
import {fetchUserList} from "@/api/user-on";
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
      tableData: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    formatter(row, column) {
      return row.address;
    },
    getList() {
      this.listLoading = true;
      fetchUserList().then(res => {
        this.tableData = res.data
      })

      setTimeout(() => {
        this.listLoading = false
      }, 1.5 * 1000)
    }
  }, mounted() {
    this.getList()

  }
}
</script>

<style scoped>
.user-manage-container {
  padding: 20px;
}

.male {
  color: deepskyblue;
}

.female {
  color: deeppink;
}
</style>
