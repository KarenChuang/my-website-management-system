<template>
  <div class="techo-list">
    <el-card class="techo-list__card">
      <div class="techo-list__header">
        <el-input placeholder="标题" size="small"></el-input>
        <el-button type="primary" size="small" @click="goCreate">
          上传手帐
        </el-button>
      </div>
    </el-card>
    <el-card class="techo-list__card">
      <el-table class="techo-list__table" :data="tableData">
        <el-table-column prop="title" label="标题" min-width="150"></el-table-column>
        <el-table-column prop="image" label="图片" min-width="100">
          <template slot-scope="{ row }">
            <img :src="`${row.image}?imageMogr2/thumbnail/!10p`" alt="img">
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" min-width="100">
          <template slot-scope="{ row }">
            <p>{{ format(row.date, 'YYYY-MM-DD') }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="{ row }">
            <!-- todo -->
            <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
    <el-card class="techo-list__footer">
      <el-pagination
        layout="total, prev, pager, next"
         @current-change="handleCurrentChange"
         :page-size="limit"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import format from 'date-fns/format'

@Component
export default class extends Vue {
  tableData = []
  offset = 0
  limit = 10
  total = 0
  format = format
  created () {
    this.loadData()
  }

  async loadData () {
    try {
      const res = (await axios.get('/api/techo', {
        params: {
          offset: this.offset,
          limit: this.limit
        }
      })).data
      this.tableData = res.list
      this.total = res.count
    } catch (error) {
      this.$message.error(error)
    }
  }

  handleCurrentChange (page: number) {
    this.offset = (page - 1) * this.limit
    this.loadData()
  }

  goCreate () {
    this.$router.push({path: '/admin/techo-create'})
  }
}
</script>

<style lang="scss">
.techo-list {
  padding: 20px;

  &__card {
    margin-bottom: 10px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-input {
      width: 250px;
    }
  }

  &__table {
    img {
      width: 60px;
    }
  }

  &__footer {
    text-align: right;
  }
}
</style>
