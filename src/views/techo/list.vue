<template>
  <div class="techo-list">
    <el-card class="techo-list__card">
      <div class="techo-list__header">
        <el-input placeholder="Title" size="small"></el-input>
        <el-button type="primary" size="small" @click="goCreate">
          上传手帐
        </el-button>
      </div>
    </el-card>
    <el-card class="techo-list__card">
      <el-table class="techo-list__table" :data="tableData">
        <el-table-column prop="_id" label="Id" min-width="180"></el-table-column>
        <el-table-column prop="image" label="Image" min-width="180">
          <template slot-scope="{ row }">
            <img :src="row.image" alt="img">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Title" min-width="180"></el-table-column>
        <el-table-column prop="date" label="Techo Date" min-width="180">
          <template slot-scope="{ row }">
            <p>{{ format(row.date, 'YYYY-MM-DD') }}</p>
          </template>
        </el-table-column>
      </el-table>
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
  format = format
  created () {
    this.loadData()
  }

  async loadData () {
    try {
      const res = (await axios.get('/api/techo', {
        params: {
          offset: 0,
          limit: 10
        }
      })).data
      this.tableData = res.list
    } catch (error) {
      this.$message.error(error)
    }
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
}
</style>
