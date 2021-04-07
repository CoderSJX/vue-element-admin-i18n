<template>
  <div class="oss-manage-container">
    <div class="headers-container">
      <div class="header-box" v-for="(header,index) in headerList" :key="header.name"
           @mouseleave="menuVisibleIndex=null">
        <div class="header-img">
          <el-image lazy
                    style="width: 120px; height: 120px"
                    :src="header.url"
                    :preview-src-list="headerSrcList"
                    class="image"
                    @contextmenu.prevent.native="openMenu(index)"
          >
          </el-image>

        </div>
        <!--          <div class="img-box">-->
        <!--            <img :src="header.url" alt="">-->
        <!--            <span class="time">{{header.lastUpdateTime}}</span>-->
        <!--          </div>-->
        <div class="header-info">

          <span class="header-name">{{ header.name }}</span>
          <span class="header-time">最后更新时间:{{ header.lastUpdateTime }}</span>
        </div>
        <div v-show="menuVisibleIndex==index" :style="{left:'0px',top:top+'px'}" class="contextmenu">

            <el-popconfirm
              title="确定删除吗？"
            >
              <el-button type="primary" slot="reference">删除</el-button>
              <!--          <li @click="menuVisibleIndex=null">删除</li>-->
            </el-popconfirm>



        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {fetchHeaderList} from "@/api/header"
import {getMoment} from "@/utils/date-filter";

export default {
  filters: {
    getMoment
  },
  data() {
    return {
      left: 0,
      top: 0,
      menuVisibleIndex: null,
      headerList: null,
      headerSrcList: []
    }
  },
  methods: {
    openMenu(index) {


      this.menuVisibleIndex = index
    },

    getHeaderList() {
      fetchHeaderList().then(res => {
        this.headerList = res.data
        this.headerList.forEach(header => {
          this.headerSrcList.push(header.url)
        })

      })
    }
  },
  mounted() {
    this.getHeaderList()

  }

}
</script>

<style scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 300;
  position: absolute;
  list-style-type: none;
  /*padding: 5px 0;*/
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;

}

/*.contextmenu li {*/
/*  margin: 0;*/
/*  padding: 7px 16px;*/
/*  cursor: pointer;*/
/*  width: 80px;*/

/*}*/

/*.contextmenu li:hover {*/
/*  background: purple;*/
/*  color: white;*/
/*}*/

.oss-manage-container {
  padding: 20px;
  /*height: 100%;*/
  /*overflow-y: auto;*/
}

.img-box {
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
}

.img-box img {
  width: 100%;
  height: 100%;

}

.headers-container {
  display: flex;
  flex-wrap: wrap;
  /*height: 800px;*/
}

.header-box {
  width: 200px;
  /*height: 200px;*/
  margin: 20px 20px;
  cursor: pointer;
  padding: 15px;
  position: relative;
}

.header-box:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}


.header-name {

  margin-top: 10px;
  font-size: 10px;
  word-wrap: break-word;
  word-break: break-word;
  text-align: center;
}

.header-info {
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
}

.header-img {
  display: flex;
  justify-content: center;
  position: relative;

}

.header-time {
  margin-top: 10px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 500;
  text-align: center;
}
</style>
