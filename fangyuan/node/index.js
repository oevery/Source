const fs = require('fs');
const path = require('path');

// json 文件写入
function write(result, path) {
  fs.writeFileSync(path, JSON.stringify(result), (err) => {
    if (err) conlose.log(err)
  });
}

async function classify() {
  let source = JSON.parse(fs.readFileSync('../source/videoRules.json'));
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
    } else if (group.includes('免解析') || group.includes('免嗅探')) {
      notDetect.push(item);
    } else if (group.includes('（')) {
      others.push(item);
    } else {
      emptyGroup.push(item);
    }
  });
  full = await full.concat(fullScore, highQuality, notDetect, others, emptyGroup);
  await write(invalid, '../classifiedSource/invalid.json');
  await write(inaccessible, '../classifiedSource/inaccessible.json');
  await write(fullScore, '../classifiedSource/fullScore.json');
  await write(highQuality, '../classifiedSource/highQuality.json');
  await write(notDetect, '../classifiedSource/notDetect.json');
  await write(others, '../classifiedSource/others.json');
  await write(emptyGroup, '../classifiedSource/emptyGroup.json');
  await write(full, '../classifiedSource/fullSource.json');
  console.log(`本次处理视频源 ${source.length} 条\n分类后情况如下：\n失效：${invalid.length}\n无法访问：${inaccessible.length}\n满分：${fullScore.length}\n优：${highQuality.length}\n免解析/嗅探：${notDetect.length}\n其他：${others.length}\n空白组：${emptyGroup.length}\n有效书源：${full.length}\n总书源：${source.length}`)
}

classify();