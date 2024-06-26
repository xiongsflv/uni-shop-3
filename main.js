
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// @代表根目录
import store from "@/store/store.js"

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http=$http
// 请求根路径
$http.baseUrl='https://www.uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  // do somethimg...
  uni.showLoading({
    title:'数据加载中'
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function () {
  // do something...
  uni.hideLoading()
}

uni.$showMsg=function(title='数据请求失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif