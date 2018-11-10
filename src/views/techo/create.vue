<template>
  <div class="techo-create">
    <el-card class="techo-create__card">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/techo-list' }">手账列表</el-breadcrumb-item>
        <el-breadcrumb-item>上传</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <el-card class="techo-create__card">
      <el-form ref="submitForm" :model="submitForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="submitForm.title"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="submitForm.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload class="avatar-uploader"
            action='http://up-z2.qiniup.com/'
            :show-file-list="false"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
            :data='fileForm'>
            <img v-if="submitForm.image && result === '上传成功'"
              :src="`${submitForm.image}?imageMogr2/thumbnail/!30p`" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <b>选择文件</b>：{{ fileName || '--' }}<br/>
          <b>上传进度</b>：
          <span>{{ loaded || '--' }} MB / {{ fileSize || '--' }} MB, {{ percent || '--' }}%</span>
          <br/>
          <b>上传结果</b>：{{ result || '--' }}<br/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script lang="ts">
import axios from 'axios'
import format from 'date-fns/format'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  submitForm = {
    title: '',
    image: '',
    date: ''
  }
  fileForm = {
    key: '',
    token: ''
  }
  fileName = ''
  fileSize = ''
  loaded = ''
  percent = ''
  result = ''
  DOMAIN:string = 'http://p4a0vsjqf.bkt.clouddn.com/'

  created () {
    this.getQiniuToken()
  }

  async getQiniuToken () {
    try {
      const res = (await axios.get('/api/qiniut/token')).data
      this.fileForm.token = res.token
    } catch (error) {
      this.$message.error(error.error)
    }
  }

  beforeUpload (file:File) {
    this.fileName = file.name
    this.fileForm.key = file.name
  }

  handleProgress (event: { loaded: number; total: number }, file:File, fileList: Array<File>) {
    this.loaded = (event.loaded / 1024 / 1024).toFixed(2)
    this.fileSize = (event.total / 1024 / 1024).toFixed(2)
    this.percent = (event.loaded / event.total * 100).toFixed(2)
  }

  handleSuccess (res: { key: string }) {
    this.submitForm.image = this.DOMAIN + res.key
    this.result = '上传成功'
  }

  handleError (error: string) {
    this.result = error
  }

  async onSubmit () {
    try {
      await axios.post('/api/techo', this.submitForm)
      this.$router.push({path: '/admin/techo-list'})
      this.$message.success('上传成功！')
    } catch (error) {
      this.$message.error(error.error.message)
    }
  }
}
</script>

<style lang="scss">
$sidel-width: 200px;
$sidel-height: 150px;
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
    width: $sidel-width;
    height: $sidel-height;
    line-height: $sidel-height;
    text-align: center;
  }

  .avatar {
    width: $sidel-width;
    height: $sidel-height;
    display: block;
  }
}
</style>
