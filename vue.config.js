module.exports = {
  devServer: {
    // host: 'dev-db-mng.bilibili.co',
    port: 8085,
    proxy: {
      '/api/': {
        target: 'http://localhost:3001'
        // onProxyReq: function (proxyReq, req) {
        //   proxyReq.setHeader('Referer', 'http://dev-db-mng.bilibili.co');
        // }
      }
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
