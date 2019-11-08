const _ = require("lodash");

var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = _.curry(abc);

var a1 = curried(1)(2)(3);
// => [1, 2, 3]

var a2 = curried(1, 2)(3);
// => [1, 2, 3]

var a3 = curried(1, 2, 3);
// => [1, 2, 3]

// 使用了占位符
var a4 = curried(1)(_, 3)(2);
// => [1, 2, 3]

console.log(a1, a2, a3, a4);
function createBind(func, bitmask, thisArg) {
  var isBind = true,
    Ctor = createCtor(func);

  function wrapper() {
    var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0:
        return new Ctor();
      case 1:
        return new Ctor(args[0]);
      case 2:
        return new Ctor(args[0], args[1]);
      case 3:
        return new Ctor(args[0], args[1], args[2]);
      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);
      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7:
        return new Ctor(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6]
        );
    }
  };
}

var object = { a: 1, b: 2 };
var other = { c: 3, d: 4 };

var values = _.memoize(_.values, (a, b) => {
  console.log(a, b, "asd<<<<");
  return a;
});
const v1 = values(object, 1);
// => [1, 2]

const v2 = values(other);
// => [3, 4]

object.a = 2;
const v3 = values(object);
// => [1, 2]
console.log(v1, v2, v3);
console.log(values.cache);
