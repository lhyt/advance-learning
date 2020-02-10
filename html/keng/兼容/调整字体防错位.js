// 安卓：
(function() {
  if (
    typeof WeixinJSBridge == 'object' &&
    typeof WeixinJSBridge.invoke == 'function'
  ) {
    handleFontSize();
  } else {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
    } else if (document.attachEvent) {
      //IE浏览器，非W3C规范
      document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
    }
  }
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function() {
      WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
    });
  }
})();

//iOS：
// ios使用-webkit-text-size-adjust禁止调整字体大小
// body{-webkit-text-size-adjust: 100%!important;}
