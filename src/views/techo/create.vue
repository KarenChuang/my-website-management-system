<template>
  <div class="techo-create">
    <el-card class="techo-create__card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/techo-list' }">手账列表</el-breadcrumb-item>
        <el-breadcrumb-item>上传</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="techo-create__card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="avatar-uploader"
            action='http://upload.qiniu.com/'
            :show-file-list="false"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :data='form'>
            <img v-if="imageBase64" :src="imageBase64" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <b>选择文件</b>：{{ fileName }}<br/>
          <b>上传进度</b>：{{ loaded }} MB / {{ fileSize }} MB, {{ percent }}%<mbr/>
          <b>上传结果</b>：{{ result }}<br/>
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
import axios from 'axios'
import format from 'date-fns/format'
import { Component, Vue } from 'vue-property-decorator'
import { constants } from 'http2'

@Component
export default class extends Vue {
  form = {
    title: null,
    image: null,
    date: null
  }
  fileForm = {
    key: ''
  }
  imageBase64 = null
  fileName:string = ''
  fileSize:string = ''
  loaded = ''
  percent = ''
  result = ''

  beforeUpload (file:File) {
    this.fileName = file.name
    this.fileForm.key = file.name
  }
  handleProgress (event: any, file:File, fileList: Array<File>) {
    this.loaded = (event.loaded / 1000000).toFixed(2)
    this.fileSize = (event.total / 1000000).toFixed(2)
    this.percent = (event.loaded / event.total * 100).toFixed(2)
  }
  handleSuccess () {
    this.result = '上传成功'
  }
  handleError (error:any) {
    this.result = error.toString()
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
