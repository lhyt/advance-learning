console.log(999);
// window.t = setInterval(() => {
//   window.MutationObserver = function F() {};
//   window.WebKitMutationObserver = function FF() {};
// }, 100);

let s = document.createElement('script');
s.textContent = `console.log('sc');
  window.MutationObserver = function F() {};
  window.WebKitMutationObserver = function FF() {};`;
document.head.insertBefore(s, document.head.firstChild);
