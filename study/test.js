// 1
function tree2table1(tree) {
  return Object.keys(tree).reduce((acc, key) => {
    acc[key] = tree[key];
    return acc;
  }, {});
}

function tree2table2(tree, path = '') {
  return Object.keys(tree).reduce((acc, key) => {
    if (typeof tree[key] === 'object') {
      acc = {
        ...acc,
        ...Object.entries(tree2table2(tree[key], path ? `${path}.${key}` : key)).reduce((o, [k, v]) => {
          o[k] = v;
          return o;
        }, {}),
      };
    } else {
      acc[path ? `${path}.${key}` : key] = tree[key];
    }
    return acc;
  }, {});
}

function tree2table3(tree, path = '') {
  return Object.keys(tree).reduce((acc, key) => {
    if (typeof tree[key] === 'object') {
      acc = {
        ...acc,
        ...Object.entries(
          tree2table3(tree[key], path ? `${path || key}${Array.isArray(tree) ? `[${key}]` : `.${key}`}` : key)
        ).reduce((o, [k, v]) => {
          o[k] = v;
          return o;
        }, {}),
      };
    } else {
      acc[path ? `${path}${Array.isArray(tree) ? `[${key}]` : `.${key}`}` : key] = tree[key];
    }
    return acc;
  }, {});
}

// 2
function isIndex(path) {
  return /\[(\d+)\]/.test(path);
}

function table2tree(table) {
  return Object.entries(table).reduce((acc, [key, value]) => {
    const paths = key.match(/([0-9a-zA-Z$_]|\[\d+\])/g);
    let current = acc;
    paths.forEach((path, i) => {
      if (i < paths.length - 1) {
        const isIndex = isIndex(path);
        const nextKey = isIndex ? RegExp.$1 : path;
        current = current[nextKey] || (current[nextKey] = isIndex(paths[i + 1]) ? [] : {});
      }
    });
    const last = paths.pop();
    current[isIndex(last) ? RegExp.$1 : last] = value;
    return acc;
  }, {});
}

// 3===
const map = {};
const pendingList = {};
async function magicReq(url) {
  if (map[url]) {
    return map[url];
  }
  if (pendingList[url]) {
    return pendingList[url].then(res => {
      delete pendingList[url];
      return res;
    });
  }
  const ret = request(url).then(res => (map[url] = res));
  pendingList[url] = ret;
  return ret;
}

// 4

function getDepsOrder(deps = [], map = {}) {
  deps.forEach(({ name: depName, deps: subDeps }) => {
    const [name, version] = depName.split('@');
    if (subDeps) {
      getDepsOrder(subDeps, map);
    }
    const prevVersion = map[name];
    map[name] = prevVersion ? `${name}@${getBigger(prevVersion.split('@')[1], version)}` : depName;
  });
  return Object.values(map);
}

function getBigger(v1, v2) {
  const v2List = v2.split('.');
  return v1.split('.').reduce((res, v, i) => {
    if (res) {
      return res;
    }
    if (Number(v) === Number(v2List[i])) {
      return false;
    }
    return Number(v) > Number(v2List[i]) ? v1 : v2;
  }, false);
}

// deps数据结构：Deps { name, deps: Deps[] }
function getOrderList(deps = [], map = new Map()) {
  deps.forEach(({ name, deps: subDeps }) => {
    const [key, version] = name.split('@');
    getOrderList(subDeps, map);
    const mapValue = map.get(key);
    map.set(key, `${key}@${mapValue ? getBigger(version, mapValue.split('@')[1]) : version}`);
  });
  return [...map.values()];
}
