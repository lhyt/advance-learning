module.exports = function(content, ...r) {
  const cb = this.async();
  setTimeout(() => {
    cb(
      null,
      `${content}
    console.log('loader', this)
  `,
      ...r
    );
  }, 10);
};
