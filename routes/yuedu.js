/*
 * @Description: 阅读书源清洗分类
 * @Author: MoonBegonia
 * @GitHub: https://github.com/MoonBegonia
 * @Date: 2019-07-05 16:14:24
 * @LastEditors: MoonBegonia
 * @LastEditTime: 2019-07-11 20:09:51
 */

const fs = require('fs');
const path = require('path');
// const check = require('./check');

// json 文件写入
function write(filePath, result) {
  fs.writeFileSync(filePath, JSON.stringify(result), (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = async () => {
  const sourcePath = path.join(__dirname, '../docs/yuedu/bookSource/myBookSource.json');
  let source = JSON.parse(fs.readFileSync(sourcePath));
  let sourceModTime = fs.statSync(sourcePath).mtime.toLocaleString();

  // 类别初始化
  let invalid = []; // 失效源
  let genuine = []; // 正版
  let audio = []; // 有声
  let r18 = []; // 18禁
  let others = []; // 轻小说/英文/名著/特殊
  let discover = []; // 发现
  let highQuality = []; // 优|A级|S级|推荐|快更|精品|💯
  let special = []; // css|json|xpath|混合|正则
  let general = []; // 普通
  let full = []; // 有效源
  let fullNOR18 = []; // 有效源,没有18禁
  let fullIncludeInvalid = [];

  // 格式化数据并写入 json 中
  await Promise.all(source.map(async (item) => {
    // const checkResult = await check.yueduSearch(item.ruleSearchUrl);

    // to string
    let name = item.bookSourceName.toString();
    let group = item.bookSourceGroup !== undefined ? item.bookSourceGroup.toString() : '';

    // bookSource format
    name = name.replace(/\[.+?]|\(.+?\)|（.+?）|《.+?》|™.*$|📚.*$|💯|▲|★|⪢|🔥|#/g, '').replace(/-| /, '~');
    let temp = [];
    // temp[0] = checkResult != true ? '失效' : null;
    temp[0] = group.includes('失效') ? '失效' : null;
    temp[1] = group.includes('正版') ? '正版' : null;
    temp[2] = item.bookSourceType === 'AUDIO' ? '有声' : null;
    temp[3] = /名著/.test(name) ? '名著' : null;
    temp[4] = /特殊/.test(name) ? '其他' : null;
    temp[3] = /轻小说/.test(group + name) ? '轻小说' : null;
    temp[4] = /英文/.test(group + name) ? '英文' : null;
    temp[5] = /18禁|腐|🔞/.test(name) || /18禁|腐|黄|🔞|禁 ⓧ/.test(group) ? '18禁' : null;
    temp[6] = item.ruleFindUrl !== undefined && item.ruleFindUrl !== '' ? '发现' : null;
    temp[7] = /css|json|xpath|混合|正则/i.test(group) ? '特殊语法' : null;
    temp[8] = /优|A级|S级|推荐|快更|精品|💯/i.test(group) ? '优' : null;
    group = temp.filter(function (e) {
      return e !== null;
    }).join('; ');
    item.bookSourceName = name;
    item.bookSourceGroup = group;

    // classify
    if (/漫|邪|社|本子/.test(name)) {
      // empty
    } else if (group.includes('失效')) {
      invalid.push(item);
    } else if (group.includes('有声')) {
      audio.push(item);
    } else if (group.includes('正版')) {
      genuine.push(item);
    } else if (/轻小说|英文|名著|其他/.test(group)) {
      others.push(item);
    } else if (group.includes('18禁')) {
      r18.push(item);
    } else if (group.includes('发现')) {
      if (group.includes('优')) {
        highQuality.push(item);
      }
      discover.push(item);
    } else if (group.includes('特殊语法')) {
      if (group.includes('优')) {
        highQuality.push(item);
      }
      special.push(item);
    } else if (group.includes('优')) {
      highQuality.push(item);
    } else {
      item.bookSourceGroup = '普通';
      general.push(item);
    }
  }));

  // 拼接数据
  fullNOR18 = await fullNOR18.concat(genuine, discover, audio, others, special, highQuality, general);
  full = await full.concat(fullNOR18, r18);
  fullIncludeInvalid = await fullIncludeInvalid.concat(full, invalid);

  // 写入数据
  await write(path.join(__dirname, '../docs/yuedu/genuine.json'), genuine);
  await write(path.join(__dirname, '../docs/yuedu/R18.json'), r18);
  await write(path.join(__dirname, '../docs/yuedu/others.json'), others);
  await write(path.join(__dirname, '../docs/yuedu/audio.json'), audio);
  await write(path.join(__dirname, '../docs/yuedu/discover.json'), discover);
  await write(path.join(__dirname, '../docs/yuedu/special.json'), special);
  await write(path.join(__dirname, '../docs/yuedu/highQuality.json'), highQuality);
  await write(path.join(__dirname, '../docs/yuedu/general.json'), general);
  await write(path.join(__dirname, '../docs/yuedu/fullNOR18.json'), fullNOR18);
  await write(path.join(__dirname, '../docs/yuedu/full.json'), full);
  await write(path.join(__dirname, '../docs/yuedu/invalid.json'), invalid);
  await write(path.join(__dirname, '../docs/yuedu/fullSourceIncludeInvalid.json'), fullIncludeInvalid);
  const time = fs.statSync(path.join(__dirname, '../docs/yuedu/full.json')).mtime.toLocaleString();

  console.log(`
原书源修改时间：${sourceModTime}

书源分类时间：${time}

|文件名|数目|
| - | - |
|[有声](./yuedu/audio.json)|${audio.length}|
|[正版](./yuedu/genuine.json)|${genuine.length}|
|[轻小说/英文/名著/其他](./yuedu/others.json)|${others.length}|
|[18禁](./yuedu/R18.json)|${r18.length}|
|[发现](./yuedu/discover.json)|${discover.length}|
|[特殊语法（css/json/xpath/混合/正则）](./yuedu/special.json)|${special.length}|
|[优（优/A级/S级/优+发现/优+特殊语法）](./yuedu/highQuality.json)|${highQuality.length}|
|[普通](./yuedu/general.json)|${general.length}|
|[有效书源NOR18](./yuedu/fullNOR18.json)|${fullNOR18.length}|
|[有效书源](./yuedu/full.json)|${full.length}|
|[失效](./yuedu/invalid.json)|${invalid.length}|
|[总书源](./yuedu/fullSourceIncludeInvalid.json)|${fullIncludeInvalid.length}|`);
};