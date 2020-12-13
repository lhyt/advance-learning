const nouns = [
  '妹妹',
  '车顶',
  '车头',
  '迷弟',
  '迷妹',
  '邻居',
  '脑残粉',
  '粉丝',
  '副驾驶',
  '排气管',
  '手表',
  '粉丝团',
  '法拉利',
  '兰博基尼',
  '劳力士',
  '理查德米勒',
  '布加迪',
  '劳斯莱斯',
  '左脚',
  '左手',
  '右手',
  '右脚',
  '爷爷',
  '隔壁老王',
];

const adjsBefore = [
  '我爱',
  '我家的',
  '我欧巴是',
  '最崇拜的人是',
  '猛男',
  '我爸爸是',
  '路过的都爱上',
  '梦到了',
  '我好想',
  '我好想做',
  '眼皮跳动，原来是',
  '我就说为什么今天那么开心，因为有',
  '算命先生说，',
  '上帝宣布，',
  '那一夜的',
  '昨晚',
  '去年',
  '好坏哟',
];

const adjsAfter = [
  '牛逼',
  '牛逼',
  '牛逼',
  '太强了',
  '欧巴',
  '好帅',
  '真男人',
  '吊炸天',
  '心动的女生',
  '真猛',
  '好坏我好喜欢',
  '，糟了，是心动的感觉',
  '嘤嘤嘤',
  '又是元气满满的一天哦',
  '么么哒',
  '放个屁，都是爱你的形状',
  '',
];
const targetList = ['蔡徐坤', '荣创', '卢本伟', 'rcnb'];

const SINGLE_NOUNS = '单独名词';
const ADJS_AND_NOUNS = '名词和形容词';
const SINGLE_ADJS = '单独形容词';
const SELF = '自己';

const setting = {
  [SINGLE_NOUNS]: {
    weight: 4,
  },
  [ADJS_AND_NOUNS]: {
    weight: 6,
  },
  [SINGLE_ADJS]: {
    weight: 5,
  },
  [SELF]: {
    weight: 1,
  },
};

const mainer = {
  get ref() {
    return targetList[Math.round((targetList.length - 1) * Math.random())];
  },
};

const targetUrl = 'https://live.bytedance.com/4304/9699089';

module.exports = {
  nouns,
  targetUrl,
  adjsBefore,
  adjsAfter,
  SINGLE_NOUNS,
  ADJS_AND_NOUNS,
  SINGLE_ADJS,
  SELF,
  setting,
  mainer,
};
