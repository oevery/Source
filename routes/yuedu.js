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
  let genuine = []; //正版
  let r18 = []; //18禁
  let audio = []; //有声
  let discover = []; //发现
  let highQuality = []; //优
  let special = []; //xpath、json、正则、css、出版
  let others = []; //待分类
  let full = []; //有效源
  let fullNOR18 = []; //有效源,没有18禁
  let fullIncludeInvalid = [];
  source.map(async (item) => {
    const group = item.bookSourceGroup !== undefined ? item.bookSourceGroup.toString() : '';
    const name = item.bookSourceName.toString();
    if(name.search(/漫|邪|社|本子/) !== -1) {
    } else if (group.includes('失效')) {
      invalid.push(item);
    } else if (item.bookSourceType === 'AUDIO') {
      audio.push(item);
    } else if (group.includes('正版')) {
      genuine.push(item);
    } else if ((group + name).search(/18禁|腐|🔞/) !== -1) {
      item.bookSourceGroup = '18禁';
      r18.push(item);
    } else if (group.includes('发现')) {
      group.search(/优|css|json|xpath|正则/i) !== -1 ? item.bookSourceGroup : item.bookSourceGroup = '发现';
      discover.push(item);
    } else if (group.search(/css|json|xpath|正则|出版/i) !== -1) {
      special.push(item);
    } else if (group.includes('优')) {
      item.bookSourceGroup = '优';
      highQuality.push(item);
    } else {
      item.bookSourceGroup = '其他';
      others.push(item);
    }
  });
  full = await full.concat(genuine, r18, discover, audio, special, highQuality, others);
  fullNOR18 = await fullNOR18.concat(genuine, discover, audio, special, highQuality, others);
  fullIncludeInvalid = await fullIncludeInvalid.concat(invalid, genuine, r18, discover, audio, special, highQuality, others);
  await write(path.join(__dirname, '../yuedu/invalid.json'), invalid);
  await write(path.join(__dirname, '../yuedu/genuine.json'), genuine);
  await write(path.join(__dirname, '../yuedu/R18.json'), r18);
  await write(path.join(__dirname, '../yuedu/audio.json'), audio);
  await write(path.join(__dirname, '../yuedu/discover.json'), discover);
  await write(path.join(__dirname, '../yuedu/special.json'), special);
  await write(path.join(__dirname, '../yuedu/highQuality.json'), highQuality);
  await write(path.join(__dirname, '../yuedu/others.json'), others);
  await write(path.join(__dirname, '../yuedu/fullNOR18.json'), fullNOR18);
  await write(path.join(__dirname, '../yuedu/full.json'), full);
  await write(path.join(__dirname, '../yuedu/fullSourceIncludeInvalid.json'), fullIncludeInvalid);
  const time = fs.statSync(path.join(__dirname, '../yuedu/full.json')).mtime.toLocaleString();
  console.log(`
原书源修改时间：${sourceModTime}

书源分类时间：${time}

|文件名|数目|
| - | - |
|[失效](/yuedu/invalid.json)|${invalid.length}|
|[正版](/yuedu/genuine.json)|${genuine.length}|
|[18禁](/yuedu/R18.json)|${r18.length}|
|[有声](/yuedu/audio.json)|${audio.length}|
|[发现](/yuedu/discover.json)|${discover.length}|
|[xpath、json、CSS、正则、出版](/yuedu/special.json)|${special.length}|
|[优](/yuedu/highQuality.json)|${highQuality.length}|
|[其他](/yuedu/others.json)|${others.length}|
|[有效书源NOR18](/yuedu/fullNOR18.json)|${fullNOR18.length}|
|[有效书源](/yuedu/full.json)|${full.length}|
|[总书源](/yuedu/fullSourceIncludeInvalid.json)|${fullIncludeInvalid.length}|`)
}