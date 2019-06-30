const Crawler = require('crawler');

let sendMessage = 'hello'

const crawler = new Crawler({
  callback : (error, res, done) => {
    if(error){
      console.log(error);
    } else {
      const $ = res.$;
      console.log($('title').text());
      const indexes = []
      $('#m6').find('.tableBody').find('tr').each((index, el) => {
        $(el).children('td').each((index2, el2) => {
          if ($(el2).text() === '6/27') {
            indexes.push(index)
          }
        })
      })
      console.log(indexes)
      $('#m6').find('.tableHead').find('tr').each((index, el) => {
        if (indexes.indexOf(index) >= 0) {
          $(el).children('td').each((index2, el2) => {
            console.log($(el2).text())
            console.log(`https://www.ipokiso.com${$(el2).find('a').attr('href')}`)
            sendMessage = `https://www.ipokiso.com${$(el2).find('a').attr('href')}`
          })
        }
      })
      const line = require('@line/bot-sdk');

      const client = new line.Client({
        channelAccessToken: process.env.token
      });

      const message = {
        type: 'text',
        text: sendMessage
      };

      client.pushMessage(process.env.group_id, message).then(() => {
        console.log('done');
      }).catch((err) => {
        console.log('error');
        console.log(err);
      });
      console.log('donedone');
    }
    done();
  }
});

crawler.queue('https://www.ipokiso.com/company/index.html');
