<template>
  <div id="app">
    <div v-for="(item,index) in file"
         :key="index">
      <button @click="downloadClick(item)">
        下载{{ item.id + item.filename }} 文件
      </button>
    </div>

  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      file: [
        {
          id: 1,
          filename: 'q.txt'
        }
      ]
    }
  },
  methods: {
    downloadClick (row) {
      let entity = {
        id: row.id,
        filename: row.filename
      }
      Axios.post('v1/FileManage/downloadFile', entity, { responseType: 'blob' }).then((response) => {
        this.download(response.body, row)
      })
    },

    // 下载文件
    download (data, row) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // 获取文件名
      // download 属性定义了下载链接的地址而不是跳转路径
      link.setAttribute('download', row.filename)
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>
