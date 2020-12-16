const Crawler = require('crawler');

let sendMessages = []
const date = new Date();
date.setHours(date.getHours() + 9);
let today = `${date.getMonth() + 1}/${date.getDate()}`
const targetId = `#m${date.getMonth() + 1}`

console.log(today)
console.log(targetId)

const crawler = new Crawler({
  callback : (error, res, done) => {
    if(error){
      console.log(error);
    } else {
      const $ = res.$;
      const indexes = []
      $(targetId).find('.tableBody').find('tr').each((index, el) => {
        $(el).children('td').each((index2, el2) => {
          if ($(el2).text() === today) {
            indexes.push(index)
          }
        })
      })
      $(targetId).find('.tableHead').find('tr').each((index, el) => {
        if (indexes.indexOf(index) >= 0) {
          $(el).children('td').each((index2, el2) => {
            console.log($(el2).text())
            console.log(`https://www.ipokiso.com${$(el2).find('a').attr('href')}`)
            sendMessages.push(`${today}上場\n${$(el2).text()}\nhttps://www.ipokiso.com${$(el2).find('a').attr('href')}`)
          })
        }
      })
      const line = require('@line/bot-sdk');

      //const client = new line.Client({
      //  channelAccessToken: process.env.token
      //});

      console.log(sendMessages);

      for(let i in sendMessages) {
        console.log(sendMessages[i]);
        const message = {
          type: 'text',
          text: sendMessages[i]
        };

        // client.pushMessage(process.env.group_id, message).then(() => {
        //   console.log('push message done');
        // }).catch((err) => {
        //   console.log('push message error');
        //   console.log(err);
        // });
      }
    }
    done();
  }
});

crawler.queue('https://www.ipokiso.com/company/index.html');
