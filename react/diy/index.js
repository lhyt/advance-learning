// import { Fiber } from './base';

const TEXT_ELEMENT = Symbol('TEXT_ELEMENT');

// 下一个工作单元
let nextUnitOfWork = null;

function createTextNode(str) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: str,
      children: [],
    },
  };
}

function createDomByFiber(fiber) {
  const dom =
    fiber.type === TEXT_ELEMENT
      ? document.createTextNode('')
      : document.createElement(fiber.type);
  Object.entries(fiber.props || {}).forEach(([key, value]) => {
    if (key !== 'children') {
      dom[key] = value;
    }
  });

  return dom;
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child !== 'object' ? createTextNode(child) : child;
      }),
    },
  };
}

function render(node, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [node],
    },
  };
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
// 一旦浏览器空闲，就触发执行单元任务
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDomByFiber(fiber);
  }
  // 子节点 DOM 插到父节点之后
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  // 每个子元素创建新的 fiber
  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
    // 根据上面的图示，父节点只链接第一个子节点
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      // 兄节点链接弟节点
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // 返回下一个任务单元（fiber）
  // 有子节点直接返回
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子节点则找兄弟节点，兄弟节点也没有找父节点的兄弟节点，
  // 循环遍历直至找到为止
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

window.R = {
  createElement,
};

window.RDOM = {
  render,
};

console.log(window);
