const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable');

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook([]),
      calculateRoutes: new AsyncParallelHook([
        'source',
        'target',
        'routesList',
      ]),
    };
  }

  /* ... */
}
const myCar = new Car();
myCar.hooks.brake.tap('WarningLampPlugin', a => {
  console.log('WarningLampPlugin on', a);
});

myCar.hooks.accelerate.tap('LoggerPlugin', newSpeed =>
  console.log(`Accelerating to ${newSpeed}`),
);

myCar.hooks.brake.call(1, 2, 3);
myCar.hooks.accelerate.call(1, 2, 3);

class Complier {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
    };
  }

  run() {
    this.hooks.accelerate.call(100);
  }
}

class Plugin {
  apply(complier) {
    complier.hooks.accelerate.tap('Plugin', sp => {
      console.log(sp, 'speed');
      complier.hooks.accelerate.tap('Plugin', sp => {
        console.log(sp, 'speed');
        return 1;
      });
    });
  }
}

const p = new Plugin();
const c = new Complier();
p.apply(c);
c.hooks.accelerate.call(1333, 2, 4);
c.hooks.accelerate.callAsync(13333333, (a, b, c) => {
  console.log(a, b, c);
});
