<template>
  <div class="techo-create">
    <el-card class="techo-create__card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="techo-create__card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="https://karenz.com/api/image/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.image" :src="form.image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import axios from 'axios'
import format from 'date-fns/format'

@Component
export default class extends Vue {
  form = {
    title: null,
    image: null,
    date: null
  }
  created () {
  }

  handleAvatarSuccess (res, file) {
    this.form.image = URL.createObjectURL(file.raw)
  }

  beforeAvatarUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    const isLt10M = file.size / 1024 / 1024 < 10

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 10MB!')
    }
    return isJPG && isLt10M
  }
  async onSubmit () {
    await axios.post('/api/techo', {

    })
  }
}
</script>

<style lang="scss">
.techo-create {
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
  .el-input {
    width: 220px;
  }
  //
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
