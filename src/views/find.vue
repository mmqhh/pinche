<template>
  <div>
    <div id="head">
      <span id="title">寻找拼车</span>
      <span id="tips">&emsp;&emsp;点击详情按钮查看更多信息</span>
      <hr>
    </div>
    <el-table id="orderTable" height="361px" :data="tableData" v-loading.body="listLoading" element-loading-text="载入中，给我一点时间"
      fit border stripe highlight-current-row style="width: 100%">
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.num | statusColorFilter">
            {{scope.row.num | statusTextFilter}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="dest" label="目的地" width="80">
        <template slot-scope="scope">
          {{scope.row.dest}}
        </template>
      </el-table-column>
      <el-table-column fit align="center" prop="startTime" label="出发时间" width="180">
        <template slot-scope="scope">
          {{scope.row.startTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="endTime" label="结束时间" width="180">
        <template slot-scope="scope">
          {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="num" label="拼车人数" width="100">
        <template slot-scope="scope">
          {{scope.row.num}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="hasManager" label="有部门经理" width="110">
        <template slot-scope="scope">
          {{scope.row.hasManager}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="applicant" label="拼车发起人">
        <template slot-scope="scope">
          {{scope.row.applicant}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="onClickDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="currentPage" :total="count" :page-size="5" @current-change="handleCurrentChange"
        @prev-click="prevPage" @next-click="nextPage"></el-pagination>
    </div>
    <order-detail ref="orderDialog" :orderInfo="orderInfo" :detailDialogVisible="showDetailDialog" 
    @refreshList="getOrderList(currentPage)"
    @close="showDetailDialog=false"></order-detail>
  </div>
</template>

<script>
  import OrderDetail from './../components/OrderDetail';
  import { getOrders } from "./../api/pin";
  import moment from "moment/min/moment.min";
  export default {
    data() {
      return {
        tableData: [],
        listLoading: false,
        count: 0,
        currentPage: 1,
        showDetailDialog: false,
        orderInfo: null
      };
    },
    components: {
      OrderDetail
    },
    filters: {
      statusColorFilter(num) {
        if (num < 3) {
          return "info";
        } else if (num >= 3 && num <= 5) {
          return "success";
        } else if (num === 6) {
          return "danger";
        }
      },
      statusTextFilter(num) {
        if (num < 3) {
          return "未生效";
        } else if (num >= 3 && num <= 5) {
          return "已生效";
        } else if (num === 6) {
          return "已满人";
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getOrderList(vm.currentPage);
      });
    },
    methods: {
      getOrderList(page) {
        this.listLoading = true;
        getOrders(page)
          .then(res => {
            this.listLoading = false;
            let table = res.data.OrderList;
            for (let item of table) {
              if (item["hasManager"] === true) {
                item["hasManager"] = "是";
              } else {
                item["hasManager"] = "否";
              }
              item.startTime = moment(item.startTime).format("YYYY-MM-DD HH:mm");
              item.endTime = moment(item.endTime).format("YYYY-MM-DD HH:mm");
            }
            this.tableData = table;
            this.count = res.data.count;
          })
          .catch();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getOrderList(this.currentPage);
      },
      nextPage(currentPage) {
        this.currentPage = currentPage;
        this.getOrderList(this.currentPage);
      },
      prevPage(currentPage) {
        this.currentPage = currentPage;
        this.getOrderList(this.currentPage);
      },
      onClickDetail(row){
        this.showDetailDialog=true;
        this.orderInfo = row;
        this.$refs['orderDialog'].getPeopleList(row.oid);
      }
    },
    // created() {
    //   this.getOrderList(this.currentPage);
    // }
  };
</script>

<style scoped>
  #head {
    line-height: 50px;
    text-align: left;
    font-size: 30px;
  }
  #tips{
    font-size: 14px;
  }
  hr {
    margin-bottom: 20px;
  }

  #pagination {
    margin-top: 15px;
  }

  #orderTable {
    line-height: 50px;
  }
</style>