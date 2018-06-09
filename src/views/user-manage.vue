<template>
  <div>
    <div id="head">
      <span id="title">用户管理</span>
      <span id="tips">&emsp;&emsp;查看并管理已注册用户</span>
      <hr>
    </div>
    <el-table id="orderTable" :data="tableData" v-loading.body="listLoading" element-loading-text="载入中，给我一点时间"
      fit border stripe highlight-current-row>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          {{scope.row.realname}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门" >
        <template slot-scope="scope">
          {{scope.row.dept}}
        </template>
      </el-table-column>
      <el-table-column fit align="center" label="手机" >
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column fit align="center" label="注册时间" >
        <template slot-scope="scope">
          {{scope.row.createdAt}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="80px">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onClickDetail(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="currentPage" :total="count" :page-size="10" @current-change="handleCurrentChange"
        @prev-click="prevPage" @next-click="nextPage"></el-pagination>
    </div>
    <order-detail ref="orderDialog" :orderInfo="orderInfo" :detailDialogVisible="showDetailDialog" 
    @refreshList="getUserList(currentPage)"
    @close="showDetailDialog=false"></order-detail>
  </div>
</template>

<script>
  import OrderDetail from './../components/OrderDetail';
  import { getUsers } from "./../api/pin";
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
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getUserList(vm.currentPage);
      });
    },
    methods: {
      getUserList(page) {
        this.listLoading = true;
        getUsers(page)
          .then(res => {
            this.listLoading = false;
            let table = res.data.userList;
            for (let item of table) {
              item.createdAt = moment(item.createdAt).format("YYYY-MM-DD HH:mm");
            }
            this.tableData = table;
            this.count = res.data.count;
          })
          .catch();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.getUserList(this.currentPage);
      },
      nextPage(currentPage) {
        this.currentPage = currentPage;
        this.getUserList(this.currentPage);
      },
      prevPage(currentPage) {
        this.currentPage = currentPage;
        this.getUserList(this.currentPage);
      },
      onClickDetail(row){
        // this.showDetailDialog=true;
        // this.orderInfo = row;
        // this.$refs['orderDialog'].getPeopleList(row.oid);
        this.$message.error('您没有此操作的权限！')
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