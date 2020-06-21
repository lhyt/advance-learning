const puppeteer = require('puppeteer');
const sleep = () =>
  new Promise(r =>
    setTimeout(() => {
      r();
    }, 4000)
  )(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.huxiu.com/article/356177.html');
    await page.setViewport({
      width: 1200,
      height: 20000,
      deviceScaleFactor: 1,
    });
    await page.hover('.related-article');
    await sleep();
    await page.waitForResponse(
      response =>
        response.url() ===
        'https://img.huxiucdn.com/article/cover/202005/11/144145920918.jpg?imageView2/1/w/360/h/203/|imageMogr2/strip/interlace/1/quality/85/format/jpg'
    );
    await page.screenshot({ path: 'example.png', fullPage: true });
    await browser.close();
  })();
