/*
 * @Description: get book source form 开源阅读软件 and git repo
 * @Author: MoonBegonia
 * @GitHub: https://github.com/MoonBegonia
 * @Date: 2019-07-11 12:08:31
 * @LastEditors: MoonBegonia
 * @LastEditTime: 2019-07-12 20:42:13
 */

const fs = require('fs');
const got = require('got');
const path = require('path');
const Parser = require('rss-parser');

const parser = new Parser();

exports.getWeChatBookSource = async () => {
  const feedURl = encodeURI('https://mb-rsshub.herokuapp.com/wechat/tgchannel/qnmdwx?filter_author=开源阅读软件');
  let wechatSource = '[';
  const feed = await parser.parseURL(feedURl);
  feed.items.forEach(async (item) => {
    const getSourceJson = item.contentSnippet.match(/{.+?}/) !== null ? item.contentSnippet.match(/{.+?}/)[0] : '';
    wechatSource += getSourceJson;
  });
  wechatSource += ']';
  fs.writeFileSync(path.join(__dirname, '../docs/yuedu/bookSource/wxBookSource.json'), wechatSource, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// get git repo book source
exports.getGitRepoBookSource = async () => {

  // open git info file and parse json to get git repos info
  const getGitRepoInfo = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/yuedu/bookSource/gitRepoInfo.json')));

  // blackwords
  const blackwords = new RegExp(`license|gitignore|keep|gitee|爱看阅读|^black$|html$|js$|css$|md$`, 'i');

  let gitRepoSource = [];

  // use got get all gitRepoSource
  await Promise.all(
    getGitRepoInfo.map(async (item) => {
      if (item.type === 'gitee') { // load gitee repo
        // gitee api: get /v5/repos/{owner}/{repo}/contents(/{path})
        const link = `https://gitee.com/api/v5/repos/${item.owner}/${item.name}/contents/${item.path}`;
        await getItemGitSource(link);
      } else if (item.type === 'github') { // load github repo
        // github api: get https://api.github.com/repos/:owner/:repo/contents(:path)
        const link = `https://api.github.com/repos/${item.owner}/${item.name}/contents/${item.path}`;
        await getItemGitSource(link);
      }
    })
  );

  // function to get item source
  async function getItemGitSource(link) {
    const response = await got(encodeURI(link));
    const list = JSON.parse(response.body);

    // load list item book source
    await Promise.all(
      list.map(async (item) => {
        if (item.type === 'dir' && !blackwords.test(item.name)) {
          await getItemGitSource(item.url);
        } else if (!blackwords.test(item.name)) {
          const response = await got(encodeURI(item.download_url));
          const itemSource = JSON.parse(response.body);
          gitRepoSource = gitRepoSource.concat(itemSource);
        }
      })
    );
  }

  fs.writeFileSync(path.join(__dirname, '../docs/yuedu/bookSource/gitRepoSource.json'), JSON.stringify(gitRepoSource), (err) => {
    if (err) {
      console.log(err);
    }
  });
};
