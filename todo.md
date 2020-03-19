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




# 字节跳动
## 1
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

## 2
1. cdn原理
2. 为什么多域名部署
3. 单元测试、e2e测试
4. event loop
5. 项目介绍一下
6. 客户端mock怎么支持
7. 怎么mock真数据，我需要真的id怎么办，除了写死
8. 什么情况用ts、什么时候不用
9. 单元测试和ts结合
10. 全球远程调度机器实现自动化测试
11. cjs实现esm

## 3
1. 项目介绍。权限系统业界内怎么设计，常见的几种
2. 工作量体现到什么地方，现在工作量大吗
3. 最困难的环节
4. 优点缺点、未来规划
5. 怕被人挑战吗，怎么应对

## hr后加面
1. 经过前面对了解，你知道我们这边做什么了吗，描述一下
2. 我们的技术栈差不多，如果你来上班，如何快速过渡和上手适应
3. 对b和c端业务对理解
4. tob业务架构设计、技术选型
5. 项目开发流程、生命周期
6. 自动化测试设计思路


# 拼多多
## 1
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

## 2
1. 项目介绍
2. 项目难点
3. 实现一个redux
4. 如果是用ts写，怎么写


# 猿辅导
## 1
1. react生命周期介绍，怎么执行。说一下下面的组件生命周期执行顺序
  ```<A> <B /> </A>```
  a.willMount 3
  b.willMount 1
  a.didMount 4
  b.didMount 2
2. redux vs context，为什么不用context
3. react 17要做什么规划，concurrent mode
4. SSR，打开你们的SSR页面看看，具体逻辑、实现方式
5. promise.then(f1, f2)和promise.then(f1).catch(f2)区别
6. () => {} vs function () {}
7. 
```js
const obj = {‏‎ ‎
  f1:‏‎ ‎() => console.log(this),
  f2‏‎ ‎() { console.log(this) },
};
obj.f1() // global
obj.f2() // obj
new obj.f1; // instance
new obj.f2; // instance
```
8. Map/Set、WeakMap，什么作用
9. 用setTimeout实现setInterval
10. Node { value: number; children: Node[] }，算出树每一层节点和，输出数组
```
         2         => 2
  2      3      5  => 10
1   2  3   4   7 8 => 25
// 每一层的和 [2, 10, 25]；
```

## 2
1. 节流、和防抖的区别，均匀的节流怎么实现
2. http缓存、强制缓存里面expire和cache-control作用，什么坑
3. 前端路由实现。history什么坑，怎么解决
4. var、let、const区别，() => {} vs function () {}
5. 一副扑克牌，随机抽 5 张，判断是否是顺子，大小王可以替代任意牌。
['A', '2', '3', 'S', 'B']   true
6. ES5 实现 B 继承 A

## 3
1. 项目难点，画一下架构
2. 有了解其他权限系统吗，对比下
3. http请求的整个过程
4. 怎么知道一个tcp请求数据已经完了呢
5. 微博的@的下面出现一个提示怎么实现。不是editable喔，基于textarea怎么实现
6. 怎么知道服务端请求回来后，客户端是局域网下哪一个ip
7. 为什么是tcp而不是udp。tcp丢包怎么办，怎么知道丢包，怎么知道已经重传成功了
8. 了解http3的quic吗
9. quic怎么解决了tcp的问题
10. quic用udp怎么保证了可靠性
11. quic的udp如果不握手，人家随便发请求怎么办
12. 函数式编程、纯函数
13. 状态管理系统设计，怎么和函数式编程结合
14. rxjs介绍一下
15. 数组和链表的区别
16. 数组和链表优点缺点，应用场景

# 虾皮
## 1
1. 项目突出点，挖项目细节问题
2. 各种情况下的__proto__指向，多道问答题
3. 页面10张img，http1是怎样的加载表现，怎么解决。那多域名又为什么可以解决呢
4. http缓存是怎样的。etag和last modify分别什么优点缺点，适合什么场景
4. 接上题，10张img，http2是怎样表现
5. http2为什么快，多了什么特性，头部压缩算法是怎样
6. react性能优化
7. 长列表优化，多种方案及对比
8. diff算法、key作用，不要key会怎样
9. react的usememo原理
10. 编程题：对象扁平化

# 作业帮
## 1
1. 一堆看代码说输出的题
2. 项目介绍
3. 编程题，9选3，不过我全部都做了，平均一分钟一道题
bind、防抖&节流、settimeout实现interval、字符串大小写反转、节点是不是属于某个节点树下、三道数组题、一堆数字组成最大数是多少

## 2
1. 说项目，深挖
2. react生命周期和diff算法
3. key的作用