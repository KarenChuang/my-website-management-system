module.exports = {
  devServer: {
    port: 8085,
    proxy: {
      '/api/': {
        target: 'http://localhost:3001'

      }
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    }
  }
}
