const fs = require('fs');
const path = require('path');

// json 文件写入
function write(path, result) {
  fs.writeFileSync(path, JSON.stringify(result), (err) => {
    if (err) conlose.log(err)
  });
}

module.exports = async() => {
  const sourcePath = path.join(__dirname, '../fangyuan/videoSource/videoRule.json');
  let source = JSON.parse(fs.readFileSync(sourcePath));
  let sourceModTime = fs.statSync(sourcePath).mtime.toLocaleDateString();
  let invalid = [];
  let inaccessible = [];
  let fullScore = [];
  let highQuality = [];
  let notDetect = [];
  let others = [];
  let emptyGroup = [];
  let full = [];
  source.map(async (item) => {
    const group = item.title.toString();
    if (group.includes('已失效')) {
      invalid.push(item);
    } else if (group.includes('无法访问')) {
      inaccessible.push(item);
    } else if (group.includes('💯')) {
      fullScore.push(item);
    } else if (group.includes('优')) {
      highQuality.push(item);
    } else if (group.search(/免解析|免嗅探/)) {
      notDetect.push(item);
    } else if (group.includes('（')) {
      others.push(item);
    } else {
      emptyGroup.push(item);
    }
  });
  full = await full.concat(fullScore, highQuality, notDetect, others, emptyGroup);
  await write(path.join(__dirname, '../fangyuan/invalid.json'), invalid);
  await write(path.join(__dirname, '../fangyuan/inaccessible.json'), inaccessible);
  await write(path.join(__dirname, '../fangyuan/fullScore.json'), fullScore);
  await write(path.join(__dirname, '../fangyuan/highQuality.json'), highQuality);
  await write(path.join(__dirname, '../fangyuan/notDetect.json'), notDetect);
  await write(path.join(__dirname, '../fangyuan/others.json'), others);
  await write(path.join(__dirname, '../fangyuan/emptyGroup.json'), emptyGroup);
  await write(path.join(__dirname, '../fangyuan/fullSource.json'), full);
  const time = new Date().toLocaleString();
  console.log(`
原视频源修改时间：${sourceModTime}

视频源分类时间：${time}

视频源分类情况：

|文件名|数目|
| - | - |
|[失效](/fangyuan/invalid.json)|${invalid.length}|
|[无法访问](/fangyuan/inaccessible.json)|${inaccessible.length}|
|[满分](/fangyuan/fullScore.json)|${fullScore.length}|
|[优](/fangyuan/highQuality.json)|${highQuality.length}|
|[免解析/嗅探](/fangyuan/notDetect.json)|${notDetect.length}|
|[其他（动漫/磁力/韩剧...）](/fangyuan/others.json)|${others.length}|
|[空白组](/fangyuan/emptyGroup.json)|${emptyGroup.length}|
|[有效视频源](/fangyuan/emptyGroup.json)|${full.length}|
|[总视频源](/fangyuan/fullSource.json)|${source.length}|`)
}