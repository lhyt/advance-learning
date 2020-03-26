class ConsolePlugin {
  apply(compiler) {
    compiler.hooks.compile.tap('MyPlugin', params => {
      // console.log('以同步方式触及 compile 钩子。', params);
    });
  }
}

module.exports = ConsolePlugin;
