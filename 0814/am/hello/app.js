//app.js
//创建应用   
App({
  onLaunch: function() {//小程序的生命周期函数 进入应用的时候触发 保存了此次登陆的log信息
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) { //全局方法   在app.js里给主应用上挂载的方法在任意页面都可以使用
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: { //全局数据   在这里挂载的数据，在任意页面都可以使用   类似vuex里state挂载
    userInfo: null
  }
})


// $.ajax({
//   url:'http://m.maizuo.com/v4/api/film/3591?__t=1502696238780',
//   type:'jsonp',
//   data:{
//     page:1,
//     count:1
//   },
//   success:function(){

//   }
// })