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
      const list = Array.from(body.querySelectorAll('.stock__main')).map(item => {
        // 名称
        let stockName = item.querySelector('.stock-name').innerText
        // // 价格
        // let stockPrice = item.querySelector('.quote-container .stock-current strong').innerText
        // // 涨幅
        // let stockGain = item.querySelector('.quote-container .stock-change').innerText
        // // 今开
        // let stockOpenNow = item.querySelector('.quote-container .quote-info .stock-rise').innerText
        // // 昨收
        // let stockYesterday = item.querySelector('.quote-container .quote-info .separateTop td:nth-child(2) span').innerHTML
        // return `${stockName} => 当前价：${stockPrice}，涨幅：${stockGain}，今开：${stockOpenNow}，昨收：${stockYesterday}`
        const data = Array.from(item.querySelectorAll('.quote-container .quote-info tr')).map(tr =>
          Array.from(tr.querySelectorAll('td'))
            .map(td => td.innerText)
            .join('，')
        )
        return `${stockName} => ${data.join('；')}`
      })
      return list.join('')
    }, bodyHandle)
    // console.log(JSON.stringify(html, null, 2))
    console.log(html)
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
