const { merge } = require('webpack-merge');
const { resolve } = require('../helper');

module.exports = merge({
  NODE_ENV: '"development"',
  devServer: {
    // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
    // 默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录
    contentBase: [resolve('')],
    // 一切服务都启用gzip 压缩
    compress: false,
    // 此路径下的打包文件可在浏览器中访问。
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。默认 publicPath 是 "/"，所以你的包(bundle)可以通过
    // http://localhost:8080/bundle.js 访问。
    // 可以修改 publicPath， 将 bundle 放在一个目录：
    publicPath: '/',

    // 启用 webpack 的模块热替换特性：
    hot: true,

    // 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
    // https: true,

    // The filename that is considered the index file.
    index: 'index.html',

    // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    noInfo: true,

    // 当打开被启用时，开发服务器将打开浏览器。
    // open: true,

    // 指定要监听请求的端口号
    port: 8080,

    // 求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
    // 如果你不想始终传递 /api ，则需要重写路径：
    proxy: {
      '/map/11': {
        target: 'https://kfront.kedacom.com',
        // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，修改配置如下：
        changeOrigin: true,
        pathRewrite: {
          '^/map': ''
        }
      }
    },
    // 将运行进度输出到控制台
    progress: true,

    // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：0.0.0.0
    // host: '0.0.0.0',
    host: 'localhost'
  }
});
