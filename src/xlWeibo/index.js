const puppeteer = require('puppeteer')
const utils = require('../utils/utils')

const getBaiduNews = () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://s.weibo.com/top/summary')
    const bodyHandle = await page.$('body')
    const html = await page.evaluate(body => {
      // const list = body.querySelectorAll('#pl_top_realtimehot table tr td:nth-child').innerHTML
      const list = Array.from(body.querySelectorAll('#pl_top_realtimehot table tr')).map(item => {
        let title = item.querySelector('td:nth-child(2)').innerText
        let url = 'https://s.weibo.com' + item.querySelector('td:nth-child(2)').href
        return { title, url }
      })
      return list
    }, bodyHandle)
    console.log(JSON.stringify(html, null, 2))
    utils.writeFile('out/wbrs.json', JSON.stringify(html, null, 2))
    let str = []
    html.forEach((item, i) => {
      str.push(`
- [${item.title}](${item.url})
    `)
    })

    utils.writeFile('out/wbrs.md', str.join(''))
    await bodyHandle.dispose()
    // await browser.close()
  })
}
module.exports = getBaiduNews
