从 dispatchInteractiveEvent 到 callCallBack 为止，都是对合成事件的处理和执行，从 setState 到 requestWork 是调用 this.setState 的逻辑，这边主要看下 requestWork 这个函数（从 dispatchEvent 到 requestWork 的调用栈是属于 interactiveUpdates$1 的 try 代码块)
```js
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);

  if (isRendering) {
    // Prevent reentrancy. Remaining work will be scheduled at the end of
    // the currently rendering batch.
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return;
  }

  // TODO: Get rid of Sync and use current time?
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    scheduleCallbackWithExpiration(expirationTime);
  }
}

```



在requestWork中有三个if分支，三个分支中有两个方法 performWorkOnRoot 和performSyncWork，就是我们默认的update函数，但是在合成事件中，走的是第二个if分支，第二个分支中有两个标识 isBatchingUpdates 和 isUnbatchingUpdates 两个初始值都为false，但是在 interactiveUpdates$1 中会把 isBatchingUpdates 设为 true 

```js
function interactiveUpdates$1(fn, a, b) {
  if (isBatchingInteractiveUpdates) {
    return fn(a, b);
  }
  // If there are any pending interactive updates, synchronously flush them.
  // This needs to happen before we read any handlers, because the effect of
  // the previous event may influence which handlers are called during
  // this event.
  if (!isBatchingUpdates && !isRendering && lowestPendingInteractiveExpirationTime !== NoWork) {
    // Synchronously flush pending interactive updates.
    performWork(lowestPendingInteractiveExpirationTime, false, null);
    lowestPendingInteractiveExpirationTime = NoWork;
  }
  var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates;
  var previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingInteractiveUpdates = true;
  isBatchingUpdates = true;  // 把requestWork中的isBatchingUpdates标识改为true
  try {
    return fn(a, b);
  } finally {
    isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates;
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}
```

在这个方法中把 isBatchingUpdates 设为了 true , 导致在 requestWork 方法中， isBatchingUpdates 为 true ，但是 isUnbatchingUpdates 是 false，而被直接return了。

那return完的逻辑回到哪里呢，最终正是回到了 interactiveUpdates 这个方法，仔细看一眼，这个方法里面有个 try finally 语法，前端这个其实是用的比较少的，简单的说就是会先执行 try代码块中的语句，然后再执行 finally 中的代码，而 fn(a, b) 是在try代码块中，刚才说到在 requestWork 中被return掉的也就是这个fn（上文提到的 从dispatchEvent到 requestWork 的一整个调用栈）。

所以当你在increment中调用 setState 之后去 console.log 的时候，是属于try代码块中的执行，但是由于是合成事件，try 代码块执行完 state 并没有更新，所以你输入的结果是更新前的 state 值，这就导致了所谓的"异步"，但是当你的 try 代码块执行完的时候（也就是你的increment合成事件），这个时候会去执行 finally 里的代码，在 finally 中执行了 performSyncWork 方法，这个时候才会去更新你的 state并且渲染到UI上。


# 二、生命周期函数中的setState
其实还是和合成事件一样，当componentDidmount执行的时候，react内部并没有更新，执行完componentDidmount后才去commitUpdateQueue更新。这就导致你在componentDidmount中setState完去console.log拿的结果还是更新前的值。

# 三、原生事件中的setState
原生事件的调用栈就比较简单了，因为没有走合成事件的那一大堆，直接触发click事件，到requestWork ,在 requestWork 里由于 expirationTime === Sync 的原因，直接走了 performSyncWork 去更新，并不像合成事件或钩子函数中被return，所以当你在原生事件中setState后，能同步拿到更新后的state值。


# 四、setTimeout中的setState
在 setTimeout 中去 setState 并不算是一个单独的场景，它是随着你外层去决定的，因为你可以在合成事件中 setTimeout，可以在钩子函数中 setTimeout，也可以在原生事件setTimeout，但是不管是哪个场景下，基于event loop的模型下，setTimeout 中里去 setState 总能拿到最新的state值。

举个栗子，比如之前的合成事件，由于 setTimeout(_ => { this.setState()}, 0)是在 try 代码块中,当你 try 代码块执行到setTimeout的时候，把它丢到列队里，并没有去执行，而是先执行的 finally 代码块，等 finally 执行完了，isBatchingUpdates又变为了 false，导致最后去执行队列里的 setState 时候， requestWork 走的是和原生事件一样的 expirationTime === Sync if分支，所以表现就会和原生事件一样，可以同步拿到最新的state值。


# 五、setState中的批量更新
在setState的时候react内部会创建一个updateQueue，通过firstUpdate、lastUpdate、lastUpdate.next去维护一个更新的队列，在最终的performWork中，相同的key会被覆盖，只会对最后一次的setState进行更新
```js

function createUpdateQueue(baseState) {
  var queue = {
    expirationTime: NoWork,
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
  return queue;
}

function appendUpdateToQueue(queue, update, expirationTime) {
  // Append the update to the end of the list.
  if (queue.lastUpdate === null) {
    // Queue is empty
    queue.firstUpdate = queue.lastUpdate = update;
  } else {
    queue.lastUpdate.next = update;
    queue.lastUpdate = update;
  }
  if (queue.expirationTime === NoWork || queue.expirationTime > expirationTime) {
    // The incoming update has the earliest expiration of any update in the
    // queue. Update the queue's expiration time.
    queue.expirationTime = expirationTime;
  }
}
```

- setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
- setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。