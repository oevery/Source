const fs = require('fs');
const path = require('path');

// json 文件写入
function write(path, result) {
  fs.writeFileSync(path, JSON.stringify(result), (err) => {
    if (err) conlose.log(err)
  });
}

module.exports = async () => {
  const sourcePath = path.join(__dirname, '../yuedu/bookSource/myBookSource.json')
  let source = JSON.parse(fs.readFileSync(sourcePath));
  let sourceModTime = fs.statSync(sourcePath).mtime.toLocaleString();
  let invalid = []; //失效源
  let discover = []; //发现
  let r18 = []; //18禁
  let highQuality = []; //优
  let special = []; //xpath、json、正则
  let genuine = []; //正版
  let general = []; //普通
  let others = []; //待分类
  let full = []; //有效源
  let fullNOR18 = []; //有效源,没有18禁
  let fullIncludeInvalid = [];
  source.map(async (item) => {
    const group = item.bookSourceGroup.toString();
    if (group.includes('失效')) {
      invalid.push(item);
    } else if (group.includes('正版')) {
      genuine.push(item);
    } else if (group.includes('发现')) {
      item.bookSourceGroup.toString().includes('优') ? item.bookSourceGroup : item.bookSourceGroup = '发现';
      discover.push(item);
    } else if (group.includes('18禁')) {
      item.bookSourceGroup = '18禁';
      r18.push(item);
    } else if (group.includes('优')) {
      item.bookSourceGroup = '优';
      highQuality.push(item);
    } else if (group.search(/JSON|JSon|XPath|正则/i) != -1) {
      special.push(item);
    } else if (group.includes('普通')) {
      general.push(item);
    } else {
      item.bookSourceGroup = '待分类';
      others.push(item);
    }
  });
  full = await full.concat(discover, r18, highQuality, special, general, genuine, others);
  fullNOR18 = await fullNOR18.concat(discover, highQuality, special, general, genuine, others);
  fullIncludeInvalid = await fullIncludeInvalid.concat(invalid, discover, r18, highQuality, general, genuine, others);
  await write(path.join(__dirname, '../yuedu/invalid.json'), invalid);
  await write(path.join(__dirname, '../yuedu/genuine.json'), genuine);
  await write(path.join(__dirname, '../yuedu/discover.json'), discover);
  await write(path.join(__dirname, '../yuedu/R18.json'), r18);
  await write(path.join(__dirname, '../yuedu/special.json'), special);
  await write(path.join(__dirname, '../yuedu/highQuality.json'), highQuality);
  await write(path.join(__dirname, '../yuedu/general.json'), general);
  await write(path.join(__dirname, '../yuedu/others.json'), others);
  await write(path.join(__dirname, '../yuedu/fullNOR18.json'), fullNOR18);
  await write(path.join(__dirname, '../yuedu/full.json'), full);
  await write(path.join(__dirname, '../yuedu/fullSourceIncludeInvalid.json'), fullIncludeInvalid);
  const time = fs.statSync(path.join(__dirname, '../yuedu/full.json')).mtime.toLocaleString();
  console.log(`
原书源修改时间：${sourceModTime}

书源分类时间：${time}

书源分类情况：

|文件名|数目|
| - | - |
|[失效](/yuedu/invalid.json)|${invalid.length}|
|[正版](/yuedu/genuine.json)|${genuine.length}|
|[发现](/yuedu/discover.json)|${discover.length}|
|[18禁](/yuedu/R18.json)|${r18.length}|
|[xpath、json、正则](/yuedu/special.json)|${special.length}|
|[优](/yuedu/highQuality.json)|${highQuality.length}|
|[普通](/yuedu/general.json)|${general.length}|
|[待分类](/yuedu/others.json)|${others.length}|
|[有效书源NOR18](/yuedu/fullNOR18.json)|${fullNOR18.length}|
|[有效书源](/yuedu/full.json)|${full.length}|
|[总书源](/yuedu/fullSourceIncludeInvalid.json)|${fullIncludeInvalid.length}|`)
}