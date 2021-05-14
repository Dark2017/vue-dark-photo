import { saveAs } from 'file-saver'

/**
 * 以URL地址形式下载文件
 * @param url
 */
export function downloadFileByURL(url, fileName = 'dowmload') {
  getBlob(url).then(blob => {
    saveAs(blob, fileName)
    // 另一种下载文件流方法
    // const a = document.createElement('a')
    // a.href = window.URL.createObjectURL(blob)
    // a.download = fileName
    // a.click()
  })
  return false
}

function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}
