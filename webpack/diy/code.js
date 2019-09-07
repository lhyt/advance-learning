var s = {
  "./0.js": {
    "dependencies": {
      "./b.js": "./b.js"
    },
    "code": "\"use strict\";\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\n//index.js\nconsole.log(_b[\"default\"]);"
  },
  "./b.js": {
    "dependencies": {
      "./a.js": "./a.js"
    },
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _a = require(\"./a.js\");\n\n//message.js\nvar message = \"say \".concat(_a.word);\nvar _default = message;\nexports[\"default\"] = _default;"
  },
  "./a.js": {
    "dependencies": {},
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.word = void 0;\n//word.js\nvar word = 'hello';\nexports.word = word;"
  }
}