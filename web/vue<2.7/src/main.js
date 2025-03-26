import Vue from 'vue'
import App from './App.vue'

///////////////////////////////////////////////////////////
/*
Since Vue officially no longer supports the maintenance of Vue2,
we have not included Vue versions lower than 2.7 in the development plan.
This example demonstrates the solution using the JS native library method.
 */
///////////////////////////////////////////////////////////
import "go-captcha-jslib/dist/gocaptcha.global.css"

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

// axios.defaults.baseURL = 'http://47.104.180.148:8081/';
axios.defaults.baseURL = 'http://0.0.0.0:9001/';

Vue.config.productionTip = false

// use element ui
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')


