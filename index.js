const yuedu = require('./routes/yuedu');
const fangyuan = require('./routes/fangyuan');

async function classify() {
  // await yuedu();
  await fangyuan();
}

classify();