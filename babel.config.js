// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          ie: "9"
          // chrome: "58"
        },
        useBuiltIns: "usage", // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
        corejs: 2 // 2-corejs@2  3-corejs@3
      }
    ]
  ],
  // plugins: ["@babel/plugin-transform-runtime"] // 这个polyfill会直接改
  plugins: [["@babel/plugin-transform-runtime", { corejs: 2 }]] // 这个只是创建一个新的变量，再把代码中的名字换了
};

// 如Array.prototype.includes这种的，其它之前提到的内置函数（Promise,Set,Map），静态方法（Array.from,Object.assign）都可以采用plugin-transform-runtime的这种形式。

/*
runtime 不污染全局变量，但是会导致多个文件出现重复代码。
写类库的时候用runtime，系统项目还是用polyfill。
写库使用 runtime 最安全，如果我们使用了 includes，但是我们的依赖库 B 也定义了这个函数
这时我们全局引入 polyfill 就会出问题：覆盖掉了依赖库 B 的 includes。
如果用 runtime 就安全了，会默认创建一个沙盒,这种情况 Promise 尤其明显
很多库会依赖于 bluebird 或者其他的 Promise 实现
一般写库的时候不应该提供任何的 polyfill 方案，而是在使用手册中说明用到了哪些新特性，让使用者自己去 polyfill。
*/

/*

@babel/core
babel编译核心包
必装开发依赖


@babel/cli
命令行执行babel命令工具
非必装开发依赖，packages.json的script中使用了babel命令则需安装


babel-loader
webpack中使用babel加载文件
非必装开发依赖，webpack项目中使用


@babel/plugin-*
babel编译功能实现插件
开发依赖，按照需要的功能安装


@babel/preset-*
功能实现插件预设
开发依赖，按照需要的功能安装，js语言新特性转换推荐使用preset-env


@babel/plugin-transform-runtime
复用工具函数
非必装开发依赖，和@babel/runtime同时存在


@babel/runtime
工具函数库
非必装生产依赖，和@babel/plugin-transform-runtime同时存在


@babel/polyfill
低版本浏览器兼容库
非必装生产依赖，已不推荐使用，推荐通过preset-env的useBuiltIns属性按需引入


core-js@*
低版本浏览器兼容库
非必装生产依赖，通过preset-env引入polyfill需安装此包，并通过corejs指定版本


@babel/runtime-corejs*
不污染变量的低版本浏览器兼容库
非必装生产依赖，plugin-transform-runtime设置开启后，可以不污染变量的引入polyfill

*/
