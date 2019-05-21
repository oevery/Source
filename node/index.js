const fs = require('fs')

// json 文件写入
function write(result, path) {
  fs.writeFileSync(path, JSON.stringify(result), (err) => {
    if (err) conlose.log(err)
  });
}

async function classify() {
  let source = JSON.parse(fs.readFileSync('../source/myBookSource.json'));
  let invalid = [];
  let discover = [];
  let r18 = [];
  let highQuality = [];
  let general = [];
  let genuine = [];
  let toBeDetermined = [];
  let full = [];
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
    } else if (group.includes('普通')) {
      general.push(item);
    } else {
      item.bookSourceGroup = '待分类';
      toBeDetermined.push(item);
    }
  });
  full = await full.concat(discover, r18, highQuality, general, genuine, toBeDetermined);
  fullIncludeInvalid = await fullIncludeInvalid.concat(invalid, discover, r18, highQuality, general, genuine, toBeDetermined);
  await write(invalid, '../classifiedSource/invalid.json');
  await write(genuine, '../classifiedSource/genuine.json');
  await write(discover, '../classifiedSource/discover.json');
  await write(r18, '../classifiedSource/R18.json');
  await write(highQuality, '../classifiedSource/highQuality.json');
  await write(general, '../classifiedSource/general.json');
  await write(toBeDetermined, '../classifiedSource/toBeDetermined.json');
  await write(full, '../classifiedSource/fullSource.json');
  await write(fullIncludeInvalid, '../classifiedSource/fullSourceIncludeInvalid.json');
  console.log(`本次处理书源 ${source.length} 条\n分类后情况如下：\n失效：${invalid.length}\n正版：${genuine.length}\n发现：${discover.length}\n18禁：${r18.length}\n优：${highQuality.length}\n普通：${general.length}\n待分类：${toBeDetermined.length}\n有效书源：${full.length}\n总书源：${fullIncludeInvalid.length}`)
}

classify();