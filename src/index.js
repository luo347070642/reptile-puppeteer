let argv = process.argv.filter(item => item.includes('='))
let params = {}
argv.forEach(item => {
  params[item.split('=')[0]] = item.split('=')[1]
})
switch (params.TARGET) {
  case 'baidu':
    require('./baiduNews/index')()
    break
  case 'xueqiu':
    require('./xueqiu/index')(params.stockCode || '000895')
    break
  default:
    require('./baiduNews/index')()
}
