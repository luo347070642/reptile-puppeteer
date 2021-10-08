const fs = require('fs')
const request = require('request')

/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */
function downloadFile(uri, filename, callback) {
  var stream = fs.createWriteStream(filename)
  request(uri).pipe(stream).on('close', callback)
}

// downloadFile('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 'out/img.jpeg', () => {})

function writeFile(path, str) {
  fs.writeFileSync(path, str)
  console.log('输入成功')
}
module.exports = {
  downloadFile,
  writeFile
}
