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

  if (data && !isFormData) {
    data = JSON.stringify(data)
    xhr.setRequestHeader('Content-Type', 'application/json')
  }

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

  xhr.send(data)
}

ajax.get = function (url, fn) {
  this({
    url,
    success: function (res) {
      fn.call(this, res)
    },
    fail: function (res) {
      fn.call(this, null, res)
    },
  })
}

ajax.post = function (url, data, fn) {
  this({
    url,
    data,
    method: 'POST',
    success: function (res) {
      fn.call(this, res)
    },
    fail: function (res) {
      fn.call(this, null, res)
    },
  })
}

// 提示
function prompt(options) {
  const message = options.message
  const cancel = options.cancel
  const confirm_click = options.success
  const cancel_click = options.fail

  const dialog = `
<section id="dialog">
  <div class="mask"></div>
  <div class="dialog">
    <div class="dialog-content">
      ${message}
    </div>
    <div class="dialog-btn">
      <a href="#" class="btn btn-default" id="cancel_confirm">${cancel ? '取消' : ''}</a>
      <a href="#" class="btn btn-primary" id="dialog_confirm">确定</a>
    </div>
  </div>
</section>`

  const dialog_box = document.createElement('div')
  dialog_box.innerHTML = dialog

  const _confirm = dialog_box.querySelector('#dialog_confirm')
  const _cancel = dialog_box.querySelector('#cancel_confirm')

  _cancel.addEventListener('click', cancel_click)
  _cancel.onclick = function () {
    dialog_box.remove()
    _cancel.removeEventListener('click', cancel_click)
  }

  _confirm.addEventListener('click', confirm_click)
  _confirm.onclick = function () {
    dialog_box.remove()
    _confirm.removeEventListener('click', confirm_click)
  }

  document.body.appendChild(dialog_box)
}

window.onload = function () {

}

// 提现
function withdraw() {

  prompt({
    message: '系统不支持1元以下提现',
    cancel: true,
    success: function () {
      console.log(2)
    },
  })

}
