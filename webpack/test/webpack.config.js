const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Cons = require('./plugin/console');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    // publicPath: "localhost:6666", // 引用路径
    path: path.resolve(__dirname, 'dist'), // dist目录
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, 'src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // { loader: './loaders/asyncconsole' },
          { loader: './loaders/console' },
          // { loader: './loaders/addhtml' },
          { loader: './loaders/addapi' },
          // { loader: "babel-loader" }
        ],
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader?cacheDirectory' }],
      },
      // {
      //   test: /\.txt?$/,
      //   exclude: /node_modules/,
      //   use: [{ loader: "./loaders/rawl" }]
      // }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      react: 'react', // npm
      reactDom: 'react-dom', // npm
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'src/index.html'), // 指定模板路径
    }),
    new webpack.DefinePlugin({
      NICE_FEATURE: true,
    }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, "dll/jquery.dll.js") // 对应的 dll 文件路径
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, "dll/jquery-manifest.json")
    // }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      qq: 'jquery',
    }),
    new Cons(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    host: 'localhost',
    overlay: true,
    compress: true,
    // hot: true,
    historyApiFallback: true,
    // proxy: {
    //   // 代理到后端的服务地址，会拦截所有以api开头的请求地址
    //   "/api": "http://localhost:3000"
    // }
  },
  mode: {
    devtool: 'cheap-module-eval-source-map',
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: '_l', // indicates global variable
    },
    // jquery: 'jQuery',
  },
};
