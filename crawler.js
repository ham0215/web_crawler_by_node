const Apify = require('apify')

process.env.APIFY_LOCAL_STORAGE_DIR = './apify_storage'

Apify.main(async () => {
  const requestList = new Apify.RequestList({
    sources: [
      { url: 'https://www.ipokiso.com/company/index.html' },
    ]
  })

  await requestList.initialize()

  const crawler = new Apify.CheerioCrawler({

    // クローリング対象のRequestListをセットする。
    requestList,

    // スクレイピング実行関数。
    // - request: Requestインスタンス。URLやhttpメソッドの情報を持つ。
    // - html: HTMLの内容。
    // - $: cheerioオブジェクト。
    handlePageFunction: async ({ request, html, $ }) => {
      console.log(`Processing ${request.url}...`)

      const title = $('title').text()
      const h1texts = []
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
          })
        }
      })
      /*
      $('tr td').each((index, el) => {
        if ($(el).text() === '6/27') {
          $(el).parent().children('td').each((index, el2) => {
            $(el2).children('a').each((index, el3) => {
              h1texts.push({
                text: $(el2).text(),
                href: $(el3).attr('href'),
              })
            })
          })
        }
      })
      */

      //  ./apify_storage/datasets/default に結果をJSONで保存。
      await Apify.pushData({
        url: request.url,
        title,
        h1texts,
      })
    },
  })

  // クローリング開始。
  await crawler.run()

  console.log('Crawler finished.')
})
