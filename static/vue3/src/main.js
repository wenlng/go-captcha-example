import { createApp } from 'vue'
import App from './App.vue'

// GoCaptcha
import "go-captcha-vue/dist/style.css"
import GoCaptcha from "go-captcha-vue"

const app = createApp(App)

// use go captcha
app.use(GoCaptcha)

app.mount('#app')