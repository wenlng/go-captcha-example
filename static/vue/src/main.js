import Vue from 'vue'

import App from './App.vue'
// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// GoCaptcha
import "go-captcha-vue/dist/style.css"
import GoCaptcha from "go-captcha-vue"

// use element ui
Vue.use(ElementUI)
// use go captcha
Vue.use(GoCaptcha)

const app = new Vue({
  render: (h) => h(App)
})

app.$mount('#app')
