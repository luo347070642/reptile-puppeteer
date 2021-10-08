const puppeteer = require('puppeteer')

;(async () => {
  // const browser = await puppeteer.launch()
  // const page = await browser.newPage()
  // await page.goto('https://www.baidu.com/')
  // await page.screenshot({ path: 'baidu.png' })
  // 目前只能在无头模式下生成pdf https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
  // await page.pdf({ path: 'baidu.pdf' })
  // console.log('pdf')
  // await browser.close()
  // const browser = await puppeteer.launch({
  //   headless: false
  // })
  // const page = await browser.newPage()
  // await page.goto('https://email.163.com/?')
  // console.log(page)
  // await page.waitForSelector('#auto-id-1631515999506')
  // await page.focus('#auto-id-1631515999506')
  // await page.waitFor(500)
  // await page.type('#auto-id-1631515999506', '17802194498', { delay: 100 })
  // await page.focus('#auto-id-1631515999509')
  // await page.waitFor(500)
  // await page.type('#auto-id-1631515999509', '1q2w3e4r....', { delay: 100 })
  // await page.waitFor(500)
  // await page.click('#dologin')
  // const search_text = '漫威'
  // const size = 15 // 每页搜索结果数
  // let start = 0 // 起始page
  // const browser = await puppeteer.launch({ headless: false })
  // const page = await browser.newPage()
  // const crawlMovies = async () => {
  //   await page.goto(`https://movie.douban.com/subject_search?search_text=${encodeURIComponent(search_text)}&start=${start * size}`, { waitUntil: 'domcontentloaded' })
  //   console.log(`crawling page ${start + 1}...`)
  //   // page.evaluate 里的 currentStart 参数需要传进去，不能直接使用外部参数
  //   let result = await page.evaluate(currentStart => {
  //     // 获取该页所有电影标题
  //     let list = Array.from(document.querySelectorAll('.detail')).map(item => item.querySelector('.title a').innerHTML)
  //     // 判断是否是最后一页，作为递归退出的条件
  //     let maxStart = Math.max.apply(
  //       null,
  //       Array.from(document.querySelectorAll('.paginator a')).map(item => {
  //         let startNum = 0
  //         try {
  //           startNum = item.getAttribute('href').match(/\d+$/)[0]
  //         } catch (e) {}
  //         return startNum
  //       })
  //     )
  //     return {
  //       list: list,
  //       isEnd: currentStart > maxStart
  //     }
  //   }, start * size)
  //   if (result.isEnd) {
  //     return result.list
  //   }
  //   start += 1
  //   return result.list.concat(await crawlMovies())
  // }
  // const movieList = await crawlMovies()
  // console.log(JSON.stringify(movieList, null, 2))
})()

puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.goto('https://top.baidu.com/board?tab=realtime')
  // const content = await page.content()
  // page.on('load', e => {
  //   console.log('load')
  //   const list = document.querySelectorAll('.category-wrap_iQLoo horizontal_1eKyQ')
  //   console.log(list)
  // })
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
  console.log(JSON.stringify(html, null, 2))
  await bodyHandle.dispose()
  // await browser.close()
})
