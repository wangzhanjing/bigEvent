$(function () {
  const layer = layui.layer
  getUserInfo()

  $('#loginOut').on('click', function () {
    layer.confirm('确定退出登录吗？', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })
})


function getUserInfo () {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) {
        return console.log(res.message);
      }
      console.log(res);
      renderAvatar(res.data)
    }
  })
}

function renderAvatar (user) {
  var name = user.nickname || user.username
  var avatar = user.user_pic
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (avatar) {
    $('.text-avatar').hide()
    $('.layui-nav-img').attr('src', avatar).show()
  } else {
    $('.layui-nav-img').hide()
    var uname = name[0].toUpperCase()
    $('.text-avatar').html(uname).show()
  }
}