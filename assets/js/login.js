$(function () {
  const form = layui.form
  const layer = layui.layer
  // const baseUrl = 'http://www.liulongbin.top:3007'

  // 切换注册和登录
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 注册提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const username = $('.reg-box [name=username]').val()
    const password = $('.reg-box [name=password]').val()
    $.ajax({
      // url: baseUrl + '/api/reguser',
      url: '/api/reguser',
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function (res) {
        if (res.status !== 0) {
          // return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#link_login').click()
      }
    })
  })
  // 登录事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    const username = $('.login-box [name=username]').val()
    const password = $('.login-box [name=password]').val()
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success: function (res) {
        if (res.status !== 0) {
          // return console.log(res.message);
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
  // 定义自定义校验规则
  form.verify({
    password: [/^[\S]{6,12}$/, '密码必须是6-12位，且没有空格'],
    repassword: function (val) {
      const password = $('.reg-box [name=password]').val()

      if (val !== password) {
        return '两次密码不一致'
      }
    }
  })
})