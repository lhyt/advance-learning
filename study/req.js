/**
 * @name 实现一个请求缓存的函数
 * @description 希望输入同样的请求 url 返回同样的结果，不发请求，达到优化的目的。只需考虑 get 请求。
 * @example
比如 request('/a')，第二次以后再遇到'/a'则不发请求，取之前的结果
 */

function request(url) {
  const t = Math.random() * 3000;
  return new Promise(r => {
    setTimeout(() => {
      r(`${url}-response: ${t}ms`);
    }, t);
  });
}

Promise.all([cachedRequest('a'), cachedRequest('aa'), cachedRequest('b'), cachedRequest('c'), cachedRequest('a')]).then(
  console.log
);
