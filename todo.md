[x] url的正则，包括hash、query、port、host、protocol、path
[x] 跨域、options请求
[ ] url到页面
[x] http缓存
[x] tcp\udp
[x] http1~3、https
[x] bfc
[ ] 层叠上下文
[x] react的key
[x] 根据key的diff算法
[x] fiber、workloop
[x] promise的实现 & 应用
[x] babel了解
[x] 二叉树非递归前中后遍历
[ ] 二叉树前中后遍历互相转化
[x] event loop(node、浏览器、node11+)
[ ] 海盗分金币
[x] 大文件上传、断点续传
[ ] setstate、usestate、usecallback实现
[ ] 原形链、多种继承
[ ] redux、react-redux、中间件
[ ] compose
[ ] redux-saga、generator
[ ] proxy深拷贝、immer
[ ] 从旧版react的class组件那套到现在
[ ] 灰度发布
[ ] node挂掉怎么办、pm2、死循环捕获
[ ] koa中间件、redux中间件
[ ] webpack plugin、tapable
[ ] dll plugin
[ ] sw、pwa
[ ] 性能监控、错误监控
[ ] ci、cd
[x] cssom如何寻找dom生成render树的
[x] https原理、ca、数字证书、信任链
[x] websocket握手
[ ] webpack hmr原理
[x] babel原理、运行过程、polyfill实现
[ ] webpack优化打包策略、内部机制、插件开发原理
[ ] 如何提升node的稳定性
[x] cjs原理
[ ] webpack 的watch机制
[ ] websocket和tcp socket区别，ws握手过程，为什么要基于http握手
[ ] 微信小程序架构
[ ] 两三列布局
[ ] 单行多行文本溢出省略
[ ] 圣杯、双飞翼布局
[ ] 固定宽高比






1. 项目难点
2. 如何设计权限系统，如何维护和定义、表的数据结构是怎样的
3. 中间人劫持，怎么防止。x-frame-option?白屏的喔，怎么办？也不一定嵌入iframe啊，可以嵌入脚本、图片，怎么阻止
4. class组件和function组件对比。写过安卓吗，那对class组件有什么看法
5. hook缺点，hook代码难维护怎么解决(最难题目，被虐了一波，没有超大项目的实践是想象不出的)
6. redux为什么每次reducer要返回一个新对象，面对大量节点如何优化
7. immuatable和shouldupdate配合、immuatable数据一些对比问题
8. http缓存、离线包原理、移动端首屏幕加载速度优化、webview冷启动、预热
9. 一个很牛逼很多功能的class组件，里面有业务生命周期，怎么在函数组件里面直接复用它
10. 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。
找到所有出现两次的元素。
你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？(限时5分钟)

输入:
[4,3,2,7,8,2,3,1]
输出:
[2,3]
A


1. react16新生命周期，有什么变化
2. react16之前的那些不好的生命周期怎么过度到react16的新生命周期
3. widllrecieveprops用到了this，getDriverStateFromProps也要用，怎么办
4. 编程题：['aaafsd', 'aawwewer', 'aaddfff'] => 'aa'(无调试，靠想象)
5. 编程题：['aa/bb/sd', 'aa/bb/wwewer', 'aa/bb/ddfff'] => 'aa/bb'(无调试，靠想象)
6. 怎么理解ts
7. ts的type和interface什么区别
8. ssr怎么实现，你们怎么做
9. 你们有没有统一构建的cli，怎么实现
10. 你们项目有ci吗，怎么做，提交的时候会做什么事情
11. e2e测试、自动化测试
12. git rebase什么作用