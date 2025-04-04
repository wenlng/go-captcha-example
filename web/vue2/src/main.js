import Vue from 'vue'
import App from './App.vue'

// GoCaptcha
import "go-captcha-vue/dist/style.css"
import GoCaptcha from "go-captcha-vue"

// Cache Testing
// import "../cache/dist/style.css"
// import GoCaptcha from "../cache"

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

//////////////////////////////////////////////////////////
// Tip:
// This URL is for effects demonstration only,
// please do not use in production environment.
axios.defaults.baseURL = 'http://47.104.180.148:8081/';
//////////////////////////////////////////////////////////

// axios.defaults.baseURL = 'http://0.0.0.0:9001/';

Vue.config.productionTip = false

// use element ui
Vue.use(ElementUI)
// use go captcha
Vue.use(GoCaptcha)

new Vue({
  render: h => h(App),
}).$mount('#app')
