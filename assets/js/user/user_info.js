$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '长度应该小于6个字符'
      }
    }
  })
  initUserInfo()

  $('#btnReset').on('click', function (e) {
    e.preventDefault()

  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        window.parent.getUserInfo()
      }
    })
  })

  function initUserInfo () {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res.data);
        form.val('formUserInfo', res.data)
      }
    })
  }

})

