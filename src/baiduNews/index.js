const puppeteer = require('puppeteer')
const utils = require('../utils/utils')

const getBaiduNews = () => {
  puppeteer.launch({ headless: true }).then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://top.baidu.com/board?tab=realtime')
    const bodyHandle = await page.$('body')
    const html = await page.evaluate(body => {
      console.log(body.innerHTML)
      const list = Array.from(body.querySelectorAll('main .container .category-wrap_iQLoo')).map(item => {
        let title = item.querySelector('.c-single-text-ellipsis').innerText
        let url = item.querySelector('.title_dIF3B').href
        let introduction = item.querySelector('.large_nSuFU').innerText
        let tagA = item.querySelector('.large_nSuFU a').innerText
        introduction = introduction.replace(tagA, '')
        return { title, url, introduction }
      })
      return list
    }, bodyHandle)
    utils.writeFile('out/data.json', JSON.stringify(html, null, 2))
    let str = []
    html.forEach((item, i) => {
      str.push(`
- [${item.title}](${item.url})

  > ${item.introduction}
    `)
    })

    utils.writeFile('out/data.md', str.join(''))
    await bodyHandle.dispose()
    await browser.close()
  })
}
module.exports = getBaiduNews
