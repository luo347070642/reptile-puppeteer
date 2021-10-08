const puppeteer = require('puppeteer')
const utils = require('../utils/utils')

const getBaiduNews = stockCode => {
  puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    const oType = stockCode.substring(0, 1) === '0' ? 'SZ' : 'SH'
    await page.goto(`https://xueqiu.com/S/${oType}${stockCode}`)
    const bodyHandle = await page.$('body')
    // console.log(await page.content())
    const html = await page.evaluate(body => {
      console.log(body.innerHTML)
      const list = Array.from(body.querySelectorAll('.quote-container')).map(item => {
        // 名称
        let stockName = item.querySelector('.stock-current strong').innerText
        // 价格
        let stockPrice = item.querySelector('.stock-current strong').innerText
        // 涨幅
        let stockGain = item.querySelector('.stock-current strong').innerText
        return { stockName, stockPrice, stockGain }
      })
      return list
    }, bodyHandle)
    console.log(JSON.stringify(html, null, 2))
    // utils.writeFile('out/data.json', JSON.stringify(html, null, 2))
    // let str = []
    //     html.forEach((item, i) => {
    //       str.push(`
    // - [${item.title}](${item.url})

    //   > ${item.introduction}
    //     `)
    //     })

    // utils.writeFile('out/data.md', str.join(''))
    await bodyHandle.dispose()
    await browser.close()
  })
}
module.exports = getBaiduNews
