const { getOptions } = require('loader-utils');

module.exports = function (content) {
  const opts = getOptions(this) || {};
  const name = `${Math.random().toString(36).slice(2)}-pic.png`;
  const path = `./${opts.publicPath || 'dist'}/${name}`;

  this.emitFile(path, content);
  return `export default "${path}"`;
};

module.exports.raw = true;

function isConst(k) {
  return typeof k === 'symbol' || /^\$.*\$$/.test(k);
}
(() => {
  with (new Proxy(
    {
      $a$: 2,
    },
    {
      get(target, name) {
        if (isConst(name)) {
          console.error(target, name, target[Symbol.unscopables]);
          return name in target ? target[name] : Error('tdd');
        }
        return target[name];
      },
      set(target, name, value) {
        if (isConst(name) && name in target) {
          console.error(target, name, value, target[Symbol.unscopables]);
          throw TypeError('Assignment to constant variable.');
        }
        return (target[name] = value);
      },
    },
  )) {
    var a = 1;
    var a = 2;
    var $a$ = 2;
    var $a$ = 23;
    console.log(a, $a$);
  }
})();

function isConst(k) {
  return typeof k === 'symbol' || /^\$.*\$$/.test(k);
}
(() => {
  const scope = new Proxy(
    {},
    {
      get(target, name) {
        if (name in target) {
          return target[name];
        }
        throw Error(`Cannot access '${name}' before initialization`);
      },
      set(target, name, value) {
        if (name in target) {
          throw TypeError('Assignment to constant variable.');
        }
        return (target[name] = value);
      },
    },
  );
  function _const(k, v) {
    scope[k] = v;
  }

  const set = _const;

  function get(k) {
    return scope[k];
  }

  get('a'); // 变量提升，报错
  _const('a', 1);
  set('a', 2); // 赋值，报错
})();

function getMaxNumber(arr) {
  return arr.reduce((acc = '', cur) => Math.max(+`${acc}${cur}`, +`${cur}${acc}`));
}

(() => {
  const list = new Set();
  function myInterval(fn, ms) {
    const ref = {};
    const exec = () => {
      return setTimeout(() => {
        fn.apply(null);
        const timer = exec();
        ref.current = timer;
      }, ms);
    };
    ref.current = exec();
    list.add(ref);
    return ref;
  }

  function myClearInterval(ref) {
    clearTimeout(ref.current);
    list.delete(ref);
  }
  window.myInterval = myInterval;
  window.myClearInterval = myClearInterval;
})();

var s = [
  {
    name: 'a@0.1.0',
    deps: [
      {
        name: 'd@0.2.0',
      },
      {
        name: 'c@0.1.0',
      },
    ],
  },
  {
    name: 'b@0.1.1',
    deps: [
      {
        name: 'e@0.1.2',
      },
      {
        name: 'c@0.1.2',
      },
    ],
  },
  {
    name: 'c@0.2.0',
  },
];

function getBigger(v1, v2) {
  const v2List = v2.split('.');
  return v1.split('.').every((v, i) => {
    return +v > +v2List[i];
  })
    ? v1
    : v2;
}

function getOrderList(deps = [], map = new Map()) {
  deps.forEach(({ name, deps: subDeps }) => {
    const [key, version] = name.split('@');
    getOrderList(subDeps, map);
    const mapValue = map.get(key);
    map.set(key, `${key}@${mapValue ? getBigger(version, mapValue.split('@')[1]) : version}`);
  });
  return [...map.values()];
}

var a = 1;
var b = 2;
// var { a: b, b: a } = { a, b }
// var { a, b } = { a: b, b: a }

// ;[a, b] = [b, a]

// a = a + b
// b = a - b
// a = a - b

// a = a * b
// b = a / b
// a = a / b

// a = a - b
// b = a + b
// a = b - a

// a = a / b
// b = a * b
// a = b / a

// var [a, b] = [a & b | b, a & b | a]

// var [a, b] = [{ [a]: b, [b]: a }[a], { [a]: b, [b]: a }[b]]

// a = ~a + b;
// b = ~(a - b);
// a = b - ~a;

// var [a, b] = [a << b >> a, a << b >> b]

// a = `${b}-${a}`;
// b = +a.split('-')[1];
// a = parseFloat(a);

// var [, a, b] = `${b}-${a}`.match(/(\d+).*?(\d+)/);

// a = `${b}-${a}`.match(/(\d+).*?(\d+)/);
// b = +a[2]
// a = +a[1]

console.log(a, b);

abcd;

function ojbk(str) {
  const { length } = str;
  let ret = '';
  for (let i = 0; i < length; i++) {
    ret += str[length - i - 1];
  }
  let temp = '';
  str = ret;
  ret = '';
  for (let j = 0; j < length; j++) {
    if (str[j] !== '.') {
      temp = str[j] + temp;
    } else {
      ret += temp + '.';
      temp = '';
    }
  }
  return ret + temp;
}

function count(start = 0, end = 0) {
  const exec = () => {
    console.log(start++);
  };
  const cancel = () => clearInterval(interval);
  const interval = setInterval(() => {
    if (start >= end) {
      cancel();
    }
    exec();
  }, 100);
  exec();
  return {
    cancel,
  };
}
function f(arr) {
  arr = arr.sort((a, b) => a - b);
  let i = 1,
    j = arr.length - 2;
  let l = arr[0];
  let r = arr[arr.length - 1];
  while (i < arr.length) {
    l = l * arr[i++] + 1;
  }
  while (j >= 0) {
    r = r * arr[j--] + 1;
  }
  return l - r;
}
