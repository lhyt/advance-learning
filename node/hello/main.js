const puppeteer = require('puppeteer');
const {
  nouns,
  adjsBefore,
  adjsAfter,
  SINGLE_NOUNS,
  ADJS_AND_NOUNS,
  SINGLE_ADJS,
  setting,
  mainer,
  SELF,
  targetUrl,
} = require('./constant');

const name = mainer;

const getRandomElementFromArr = arr => arr[Math.round((arr.length - 1) * Math.random())];

const randomRenderCache = {};
const randomRender = (str, p = 0.5, backup = '') => {
  if (p <= 0 || p > 1) {
    p = Math.random();
  }
  p *= 100;
  p = Math.round(p);
  const examples =
    randomRenderCache[p] ||
    (randomRenderCache[p] = Array(100)
      .fill(0)
      .map((_, i) => (i > p ? 0 : 1)));
  return examples[Math.round(Math.random() * 99)] ? str : backup;
};

const handles = {
  [SINGLE_NOUNS](n) {
    return `${n}的${getRandomElementFromArr(nouns)}`;
  },
  [ADJS_AND_NOUNS](n) {
    return `${getRandomElementFromArr(adjsBefore)}${n}的${getRandomElementFromArr(nouns)}`;
  },
  [SINGLE_ADJS](n) {
    return Math.random() > 0.5 ?
      `${getRandomElementFromArr(adjsBefore)}${n}` :
      `${n}${getRandomElementFromArr(adjsAfter, 0.9)}`;
  },
  [SELF]() {
    return `${randomRender(getRandomElementFromArr(adjsBefore))}${randomRender('我', 0.5, name.ref)}${randomRender(
      getRandomElementFromArr(adjsAfter, 0.9)
    )}`;
  },
};

const initialSetting = Object.entries(setting)
  .reduce((acc, [k, { weight }]) => [...acc, ...Array.from({ length: weight }).map(_ => k)], [])
  .sort(() => 0.5 - Math.random());

const genName = n => handles[getRandomElementFromArr(initialSetting)](n);

const sleep = (t = 2000) =>
  new Promise(r =>
    setTimeout(() => {
      r();
    }, t)
  );

const main = async () => {
  try {
    const browser = await puppeteer.launch();
    // const browser = await puppeteer.launch({
    //   headless: false,
    //   args: ['--auto-open-devtools-for-tabs'],
    // });
    const page = await browser.newPage();
    await page.goto(targetUrl);
    await sleep();
    await page.click('.byte-textarea.message-footer-input', {});
    await sleep(500);
    await page.type('.byte-input.byte-input-size-default', genName(name.ref));
    await page.click('.byte-btn.byte-btn-primary.byte-btn-size-default.byte-btn-shape-square.nickname-modal-btns-btn');
    await sleep(300);
    await page.click('.byte-textarea.message-footer-input', {});
    await page.focus('.byte-textarea.message-footer-input', {});
    await page.type('.byte-textarea.message-footer-input', handles[SELF](name.ref));
    await sleep(1000);
    await page.keyboard.press('Enter');
    await sleep(500);
    await browser.close();
    // setTimeout(main);
  } catch (e) {
    console.log(e);
  }
};

main();
