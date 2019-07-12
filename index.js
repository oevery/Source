const yuedu = require('./routes/yuedu');
const fangyuan = require('./routes/fangyuan');
const getBookSource = require('./routes/getBookSource');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ''
});
console.log('菜单：\n1: 书源分类;\n2: 视频源分类;\n3: 公众号书源获取;\n4: git repo 书源获取;\nclose: 退出');

rl.on('line', async (input) => {
  switch (input.trim()) {
    case '1':
      await yuedu();
      break;
    case '2':
      await fangyuan();
      break;
    case '3':
      await getBookSource.getWeChatBookSource();
      break;
    case '4':
      await getBookSource.getWeChatBookSource();
      break;
    case 'close':
      rl.close();
      break;
    default:
      console.log('请输入正确的命令！');
      break;
  }
});

rl.on('close', function () {
  console.log('bye bye');
  process.exit(0);
});