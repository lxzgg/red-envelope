function ajax(options) {
  const url = options.url
  let data = options.data
  const header = options.header
  const method = options.method || 'GET'
  const dataType = options.dataType || 'json'
  const responseType = options.responseType || 'text'
  const success = options.success
  const fail = options.fail
  const complete = options.complete

  const isFormData = data instanceof FormData

  let xhr = new XMLHttpRequest()

  xhr.open(method, url, true)

  if (data && !isFormData) xhr.setRequestHeader('Content-Type', 'application/json')

  for (let i in header) xhr.setRequestHeader(i, header[i])

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    let result = xhr.responseText
    if (xhr.status >= 200 && xhr.status < 300) {

      if (responseType === 'text' && dataType === 'json') result = JSON.parse(result)

      if (success) success.call(this, result)

    } else if (fail) fail.call(this, result)

    if (complete) complete.call(this, result)
  }

  if (!isFormData) data = JSON.stringify(data)

  xhr.send(data)

}

const formData = new FormData()

formData.append('a', '1')

ajax({
  url: 'http://127.0.0.1:3000',
  data: formData,
  method: 'POST',
  success: function (res) {
    console.log(res)
  },
})

//
// ajax.post('http://127.0.0.1:3000', {a: ['1', '2']}, function (res) {
//   console.log(res)
// })
//
// ajax.get('https://cnodejs.org/api/v1/topics', function (res) {
//   console.log(res)
// })

// window.onload = function () {
//
// }
//
// // 隐藏对话框
// function showDialog() {
//   document.getElementById('dialog').style.display = 'block'
// }
//
// // 隐藏对话框
// function hideDialog() {
//   document.getElementById('dialog').style.display = 'none'
// }
