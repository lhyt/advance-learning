
      (function(graph) {
          //require函数的本质是执行一个模块的代码，然后将相应变量挂载到exports对象上
          function require(module) {
              //localRequire的本质是拿到依赖包的exports变量
              function localRequire(relativePath) {
                  return require(graph[module].dependencies[relativePath]);
              }
              var exports = {};
              (function(require, exports, code) {
                  eval(code);
              })(localRequire, exports, graph[module].code);
              return exports;//函数返回指向局部变量，形成闭包，exports变量在函数执行后不会被摧毁
          }
          require('./0.js')
      })({"./0.js":{"dependencies":{"./b.js":"./b.js"},"code":"\"use strict\";\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//index.js\nconsole.log(_b[\"default\"]);"},"./b.js":{"dependencies":{"./a.js":"./a.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _a = require(\"./a.js\");\n\n//message.js\nvar message = \"say \".concat(_a.word);\nvar _default = message;\nexports[\"default\"] = _default;"},"./a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\n//word.js\nvar word = 'hello';\nexports.word = word;"}})