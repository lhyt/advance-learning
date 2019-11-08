"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var fn = function fn(arg) {
  console.log(arg);
};

var People =
/*#__PURE__*/
function () {
  function People() {
    (0, _classCallCheck2.default)(this, People);
    this.p = 1;
  }

  (0, _createClass2.default)(People, [{
    key: "f",
    value: function f() {
      console.log(this.p);
    }
  }]);
  return People;
}();

var p = new People();
p.f();
var a = (0, _from.default)([1]);
console.log(a, "array from");