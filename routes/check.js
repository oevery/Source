/*
 * @Description: 校验书源是否失效（简单粗暴版）
 * @Author: MoonBegonia
 * @GitHub: https://github.com/MoonBegonia
 * @Date: 2019-07-05 21:31:55
 * @LastEditors: MoonBegonia
 * @LastEditTime: 2019-07-11 20:26:54
 */

const got = require('got');

exports.yueduSearch = async (ruleSearchUrl) => {
  const url = ruleSearchUrl.toString();
  let result = true;

  // 确定网站编码方式以及 header（暂时无用）
  const encoding = url.match(/\|char=(.+?$)/) !== null ? url.match(/\|char=(.+?$)/)[1] : 'utf8';
  // const header = url.match(/@Header:{(.+?)}/) != null ? url.match(/@Header:{(.+?)}/)[1] : null;

  // 编码 searchKey
  const searchKey = encoding !== 'utf8' ? 'CED2B5C4' : '我的';

  // 去除 char|Header
  let searchUrl = url.replace(/\|char=.+?$|@Header:{.+?}/, '');

  // 替换 searchKey
  searchUrl = searchUrl.replace(/searchKey/, searchKey);
  try {
    await got.get(searchUrl, {
      encoding: null,
      timeout: 300,
    });
  } catch (err) {
    result = false;
  }
  return result;
};
