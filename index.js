const config = require("./config.json");
const io = require('@pm2/io')
const VkBot = require('node-vk-bot-api');
const fs = require("fs");
const bot = new VkBot(config.token);
const msgcount=require("./msgcount.json");

const messagecount = io.metric({
  name: 'Message Count'
})

bot.command('/count', (ctx) => {
  if([2,3,4].indexOf(msgcount.count%10)+1){
    ctx.reply(`${msgcount.count} раза`)
  }
  else
  ctx.reply(`${msgcount.count} раз`)
});
bot.event("message_new", (ctx) => {
  if(ctx.message.from_id==236109873){
    msg=ctx.message.text;
    if(msg.includes('🗿')){
      msgcount.count++;
      messagecount.set(msgcount.count);
      fs.writeFileSync("msgcount.json", JSON.stringify(msgcount));
      switch(msgcount.count){
        case '50':
      ctx.reply(`пфф, всего 50 раз`);
      break;
      case '100':
      ctx.reply(`соточка)))`);
      break;
      case '150':
      ctx.reply(`Вот это уже много, 150 раз`);
      break;
      case '200':
        ctx.reply(`Никита, остановись🗿, 200 раз блин`);
        break;
        case '1000':
        ctx.reply(`doom guy🗿`);
        break;
      }
    }
  }
  });

 bot.startPolling((err) => {
  if (err) {
    console.error(err);
  }
  console.log('Bot started.');
});