import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// GoCaptcha
import "go-captcha-vue/dist/style.css"
import GoCaptcha from "go-captcha-vue"

// Cache Testing
// import "../cache/dist/style.css"
// import GoCaptcha from "../cache"

import * as NaiveUi from 'naive-ui'
import axios from 'axios'

axios.defaults.baseURL = 'http://47.104.180.148:8081/';

const app = createApp(App)
// use go captcha
app.use(GoCaptcha)

app.component('n-message-provider', NaiveUi.NMessageProvider)

app.mount('#app')