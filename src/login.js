const puppeteer = require('puppeteer')
// const fs = require('fs')
// const utils = require('./utils')
// puppeteer.launch({ headless: true }).then(async browser => {
//   const page = await browser.newPage()
//   await page.goto('https://top.baidu.com/board?tab=realtime')
//   const bodyHandle = await page.$('body')
//   const html = await page.evaluate(body => {
//     console.log(body.innerHTML)
//     const list = Array.from(body.querySelectorAll('main .container .category-wrap_iQLoo')).map(item => {
//       let title = item.querySelector('.c-single-text-ellipsis').innerText
//       let url = item.querySelector('.title_dIF3B').href
//       let introduction = item.querySelector('.large_nSuFU').innerText
//       let tagA = item.querySelector('.large_nSuFU a').innerText
//       introduction = introduction.replace(tagA, '')
//       return { title, url, introduction }
//     })
//     return list
//   }, bodyHandle)
//   utils.writeFile('out/data.json', JSON.stringify(html, null, 2))
//   await bodyHandle.dispose()
//   await browser.close()
// })

;(async () => {
  let timeout = function (delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(1)
        } catch (e) {
          reject(0)
        }
      }, delay)
    })
  }
  const browser = await puppeteer.launch({ headless: false, slowMo: 0 })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto('https://kyfw.12306.cn/otn/resources/login.html')
  await page.click('.login-hd-account')
  await page.type('#J-userName', 'luo347070642')
  await page.type('#J-password', 'ilxm1994')
  await page.click('#J-login')
  // await page.mouse.click(895, 955, { delay: 2000 })
  await page.mouse.move(895, 955)
  page.mouse.down()
  await page.mouse.move(1230, 955)
  page.mouse.up()
  // await page.waitForNavigation({
  //   waitUntil: 'domcontentloaded'
  // })
  // console.log(page.url())
  // console.log('填写验证码后登录')
  // await page.waitForNavigation({
  //   waitUntil: 'load'
  // })
  // await page.screenshot({ path: screenshot })

  async function getBtnPosition() {
    const btn_position = await page.evaluate(body => {
      // const btn = body.querySelector('#nc_1__scale_text')
      // const clientWidth = btn.clientWidth
      // const clientHeight = btn.clientHeight
      // return { btn_left: clientWidth, btn_top: clientHeight }
      return body.innerHTML
    })
    console.log(btn_position)
    return btn_position
  }

  // browser.close()
  // console.log('See screenshot: ' + screenshot)
})()

// const puppeteer = require('puppeteer')
// const devices = require('puppeteer/DeviceDescriptors')
// const iPhone = devices['iPhone 6 Plus']
// let timeout = function (delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         resolve(1)
//       } catch (e) {
//         reject(0)
//       }
//     }, delay)
//   })
// }
// let page = null
// let btn_position = null
// let times = 0 // 执行重新滑动的次数
// const distanceError = [-10, 2, 3, 5] // 距离误差
// async function run() {
//   const browser = await puppeteer.launch({
//     headless: false //这里我设置成false主要是为了让大家看到效果，设置为true就不会打开浏览器
//   })
//   page = await browser.newPage() // 1.打开前端网
//   await page.emulate(iPhone)
//   await page.goto('https://kyfw.12306.cn/otn/resources/login.html')
//   await page.click('.login-hd-account')
//   await page.type('#J-userName', 'luo347070642')
//   await page.type('#J-password', 'ilxm1994')
//   await page.click('#J-login')
//   await timeout(1000)
//   btn_position = await getBtnPosition() // 5.滑动
//   drag(null)
// }
// /**
//  * 计算按钮需要滑动的距离
//  * */
// async function calculateDistance() {
//   const distance = await page.evaluate(() => {
//     // 比较像素,找到缺口的大概位置
//     function compare(document) {
//       const ctx1 = document.querySelector('.geetest_canvas_fullbg') // 完成图片
//       const ctx2 = document.querySelector('.geetest_canvas_bg') // 带缺口图片
//       const pixelDifference = 30 // 像素差
//       let res = [] // 保存像素差较大的x坐标 // 对比像素
//       for (let i = 57; i < 260; i++) {
//         for (let j = 1; j < 160; j++) {
//           const imgData1 = ctx1.getContext('2d').getImageData(1 * i, 1 * j, 1, 1)
//           const imgData2 = ctx2.getContext('2d').getImageData(1 * i, 1 * j, 1, 1)
//           const data1 = imgData1.data
//           const data2 = imgData2.data
//           const res1 = Math.abs(data1[0] - data2[0])
//           const res2 = Math.abs(data1[1] - data2[1])
//           const res3 = Math.abs(data1[2] - data2[2])
//           if (!(res1 < pixelDifference && res2 < pixelDifference && res3 < pixelDifference)) {
//             if (!res.includes(i)) {
//               res.push(i)
//             }
//           }
//         }
//       } // 返回像素差最大值跟最小值，经过调试最小值往左小7像素，最大值往左54像素
//       return { min: res[0] - 7, max: res[res.length - 1] - 54 }
//     }
//     return compare(document)
//   })
//   return distance
// }
// /**
//  * 计算滑块位置
//  */
// async function getBtnPosition() {
//   const btn_position = await page.evaluate(() => {
//     const { clientWidth, clientHeight } = document.querySelector('.geetest_popup_ghost')
//     return { btn_left: clientWidth / 2 - 104, btn_top: clientHeight / 2 + 59 }
//   })
//   return btn_position
// }
// /**
//  * 尝试滑动按钮
//  * @param distance 滑动距离
//  * */
// async function tryValidation(distance) {
//   //将距离拆分成两段，模拟正常人的行为
//   const distance1 = distance - 10
//   const distance2 = 10
//   page.mouse.click(btn_position.btn_left, btn_position.btn_top, { delay: 2000 })
//   page.mouse.down(btn_position.btn_left, btn_position.btn_top)
//   page.mouse.move(btn_position.btn_left + distance1, btn_position.btn_top, { steps: 30 })
//   await timeout(800)
//   page.mouse.move(btn_position.btn_left + distance1 + distance2, btn_position.btn_top, { steps: 20 })
//   await timeout(800)
//   page.mouse.up()
//   await timeout(4000) // 判断是否验证成功
//   const isSuccess = await page.evaluate(() => {
//     return document.querySelector('.geetest_success_radar_tip_content') && document.querySelector('.geetest_success_radar_tip_content').innerHTML
//   })
//   await timeout(1000) // 判断是否需要重新计算距离
//   const reDistance = await page.evaluate(() => {
//     return document.querySelector('.geetest_result_content') && document.querySelector('.geetest_result_content').innerHTML
//   })
//   await timeout(1000)
//   return { isSuccess: isSuccess === '验证成功', reDistance: reDistance.includes('怪物吃了拼图') }
// }
// /**
//  * 拖动滑块
//  * @param distance 滑动距离
//  * */
// async function drag(distance) {
//   distance = distance || (await calculateDistance())
//   const result = await tryValidation(distance.min)
//   if (result.isSuccess) {
//     await timeout(1000) //登录
//     console.log('验证成功')
//     page.click('#modal-member-login button')
//   } else if (result.reDistance) {
//     console.log('重新计算滑距离录，重新滑动')
//     times = 0
//     await drag(null)
//   } else {
//     if (distanceError[times]) {
//       times++
//       console.log('重新滑动')
//       await drag({ min: distance.max, max: distance.max + distanceError[times] })
//     } else {
//       console.log('滑动失败')
//       times = 0
//       run()
//     }
//   }
// }
// run()
