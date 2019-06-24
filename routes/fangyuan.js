const fs = require('fs');
const path = require('path');

// json 文件写入
function write(path, result) {
  fs.writeFileSync(path, JSON.stringify(result), (err) => {
    if (err) conlose.log(err)
  });
}

module.exports = async () => {
  const sourcePath = path.join(__dirname, '../fangyuan/videoSource/videoRule.json');
  let source = JSON.parse(fs.readFileSync(sourcePath));
  let sourceModTime = fs.statSync(sourcePath).mtime.toLocaleString();
  let invalid = [];
  let inaccessible = [];
  let fullScore = [];
  let highQuality = [];
  let notDetect = [];
  let akmd = [];
  let others = [];
  let emptyGroup = [];
  let general = [];
  let full = [];
  source.map(async (item) => {
    const group = item.title.toString();
    if (group.includes('已失效')) {
      invalid.push(item);
    } else if (group.includes('无法访问')) {
      inaccessible.push(item);
    } else if (group.search(/💯/) !== -1) {
      fullScore.push(item);
    } else if (group.includes('（优')) {
      highQuality.push(item);
    } else if (group.search(/免解析|免嗅探/) !== -1) {
      notDetect.push(item);
    } else if (group.search(/（动漫|（磁力|（下载|（韩剧/) !== -1) {
      akmd.push(item);
    } else if (group.includes('（')) {
      others.push(item);
    } else {
      emptyGroup.push(item);
    }
  });
  general = await general.concat(fullScore, notDetect, akmd);
  full = await full.concat(general, others, highQuality, emptyGroup);
  await write(path.join(__dirname, '../fangyuan/invalid.json'), invalid);
  await write(path.join(__dirname, '../fangyuan/inaccessible.json'), inaccessible);
  await write(path.join(__dirname, '../fangyuan/fullScore.json'), fullScore);
  await write(path.join(__dirname, '../fangyuan/highQuality.json'), highQuality);
  await write(path.join(__dirname, '../fangyuan/notDetect.json'), notDetect);
  await write(path.join(__dirname, '../fangyuan/akmd.json'), akmd);
  await write(path.join(__dirname, '../fangyuan/others.json'), others);
  await write(path.join(__dirname, '../fangyuan/emptyGroup.json'), emptyGroup);
  await write(path.join(__dirname, '../fangyuan/general.json'), general);
  await write(path.join(__dirname, '../fangyuan/full.json'), full);
  const time = fs.statSync(path.join(__dirname, '../fangyuan/full.json')).mtime.toLocaleString();
  console.log(`
原视频源修改时间：${sourceModTime}

视频源分类时间：${time}

|文件名|数目|
| - | - |
|[失效](/fangyuan/invalid.json)|${invalid.length}|
|[无法访问](/fangyuan/inaccessible.json)|${inaccessible.length}|
|[满分](/fangyuan/fullScore.json)|${fullScore.length}|
|[优](/fangyuan/highQuality.json)|${highQuality.length}|
|[免解析/嗅探](/fangyuan/notDetect.json)|${notDetect.length}|
|[动漫/磁力/下载/韩剧](/fangyuan/akmd.json)|${akmd.length}|
|[简介评论/差/网盘/爱优酷腾/综合](/fangyuan/others.json)|${others.length}|
|[空白组](/fangyuan/emptyGroup.json)|${emptyGroup.length}|
|[满分/免嗅探/免解析/动漫/磁力/下载/韩剧](/fangyuan/general.json)|${general.length}|
|[有效视频源](/fangyuan/full.json)|${full.length}|
|[总视频源](/fangyuan/videoSource/videoRule.json)|${source.length}|`)
}