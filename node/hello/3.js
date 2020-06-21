console.log('this is 3');

function f(obj) {
  if (typeof obj === 'function') {
    const str = obj.toString();
    /^function\s*\w*\s*\((.*)\)\s*\{([\s\S]*)/.test(str); // 匹配函数体
    const args = RegExp.$1.split(',').map((item) => item.trim());
    console.log(2, RegExp.$1, RegExp.$2);
    console.log({ a: 1 });
    console.log(1, RegExp.$1, RegExp.$2); // 这样有问题，后续无法输出RegExp.$X
    console.log(3, RegExp.$1, RegExp.$2);
    console.log(4, RegExp.$1, RegExp.$2);
    const str1 = RegExp.$2.slice(0, -1); // 去除末尾花括号
    return new Function(...args, str1);
  }
}

f(function d(n1, n2) {
  console.log(n1, n2);
});

function debounce(f) {
  let t;
  return function (...args) {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      f.apply(null, args);
    }, 500);
  };
}

function handleTextNode(node, ...rest) {
  const isStart = rest.length === 2;
  const newTextNode = document.createTextNode(
    node.data.slice.apply(node.data, isStart ? rest : [rest[0]])
  );
  const newA = document.createElement('a');
  newA.innerText = node.data.slice.apply(
    node.data,
    isStart ? [rest[1]] : [0, rest[0]]
  );
  newA.style.color = '#f00';
  const fr1 = document.createDocumentFragment();
  if (isStart) {
    fr1.appendChild(newTextNode);
    fr1.appendChild(newA);
  } else {
    fr1.appendChild(newA);
    fr1.appendChild(newTextNode);
  }
  node.parentNode.replaceChild(fr1, node);
}

function findPath(node, target) {
  const path = [];
  while (node && target && node !== target) {
    path.push(node);
    node = node.parentNode;
  }
  return path;
}

function backwards(from, to, parentNode) {
  const fromPath = findPath(from, parentNode);
  const toPath = findPath(to, parentNode);
  console.log(
    fromPath.map((x) => x.innerText),
    toPath.map((x) => x.innerText)
  );
  console.log([...parentNode.children].map((x) => x.innerText));
  console.log(
    [...parentNode.children].indexOf(fromPath[fromPath.length - 1]),
    [...parentNode.children].indexOf(toPath[toPath.length - 1])
  );
}

function handleSelect() {
  try {
    const selection = getSelection();
    const range = selection.getRangeAt(0);
    const {
      commonAncestorContainer,
      endContainer,
      startContainer,
      endOffset,
      startOffset,
    } = range;
    console.log(startContainer, endContainer);
    if (startContainer === endContainer) {
      const newA = document.createElement('a');
      newA.innerText = startContainer.data.slice(startOffset, endOffset);
      newA.style.color = '#f00';
      const fr = document.createDocumentFragment();
      fr.appendChild(
        document.createTextNode(startContainer.data.slice(0, startOffset))
      );
      fr.appendChild(newA);
      fr.appendChild(
        document.createTextNode(startContainer.data.slice(endOffset))
      );
      startContainer.parentNode.replaceChild(fr, startContainer);
    } else {
      handleTextNode(startContainer, 0, startOffset);
      handleTextNode(endContainer, endOffset);
      backwards(startContainer, commonAncestorContainer);
      backwards(endContainer, commonAncestorContainer);
    }
    selection.removeAllRanges();
  } catch {}
}

document.addEventListener('selectionchange', debounce(handleSelect));
