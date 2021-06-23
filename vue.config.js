const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 配置true会有.map文件，打包后体积大, false打包后不会有.map文件，打包后体积小 生产环境配置false
  productionSourceMap: process.env.NODE_ENV !== 'production',
  lintOnSave: process.env.NODE_ENV === "development", // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
}
