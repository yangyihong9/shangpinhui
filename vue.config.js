module.exports = ({
  productionSourceMap:false,
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    host: 'localhost', port: 8080,
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
})
