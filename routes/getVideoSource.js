const fs = require('fs');
const path = require('path');
const Parser = require('rss-parser');

const parser = new Parser();

// get WeChat book source from telegram channel @qnmdwx
module.exports = async () => {
  const feedURl = encodeURI('http://localhost:1200/wechat/tgchannel/qnmdwx?filter_author=新方圆小棉袄');
  const wxSourcePath = path.join(__dirname, '../docs/fangyuan/videoSource/wxVideoSource.json');
  let wechatSource = JSON.parse(fs.readFileSync(wxSourcePath));
  let wechatSourceString = '[';
  const feed = await parser.parseURL(feedURl);
  await feed.items.forEach(async function (item) {
    const getSourceJson = item.contentSnippet.match(/{.+?}[\u4e00-\u9fa5]/g).toString();
    // const getSourceJson = JSON.parse(/{.+?}/g.exec(item.contentSnippet));
    wechatSourceString = getSourceJson !== null ? wechatSourceString + getSourceJson + ',' : '';
  });
  wechatSource = wechatSource.concat(JSON.parse(wechatSourceString.replace(/[\u4e00-\u9fa5],/g, ',').replace(/,$/, ']')));
  fs.writeFileSync(wxSourcePath, wechatSource, (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log('公众号视频源获取完毕！');
};
