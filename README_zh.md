<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
</div>

<h3 style="text-align: center ">Golang/前端的实例合集</h3>

<br/>

> [English](README.md) | 中文
>
<p style="text-align: center">
<a style="font-weight: bold" href="https://github.com/wenlng/go-captcha">Go Captcha</a> 是行为式验证码，支持文本/图形点选、滑动/拖拽、旋转等验证模式。
</p>

<p style="text-align: center"> ⭐️ 如果能帮助到你，请随手给点一个star</p>
<p style="text-align: center">QQ交流群：178498936</p>


<div align="center"> 
    <img src="http://47.104.180.148/go-captcha/go-captcha-v1.png" alt="Poster">
</div>

<br/>
<hr/>
<br/>

## 链接索引

| 名称                                                                         | 描述                                                                                          |
|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [document](http://gocaptcha.wencodes.com)                                  | GoCaptcha 文档                                                                                |
| [online demo](http://gocaptcha.wencodes.com/demo/)                         | GoCaptcha 在线演示                                                                              |
| [go-captcha-example](https://github.com/wenlng/go-captcha-example)         | Golang + 前端 + APP实例                                                                         |
| [go-captcha-assets](https://github.com/wenlng/go-captcha-assets)           | Golang 内嵌素材资源                                                                               |
| [go-captcha](https://github.com/wenlng/go-captcha)                         | Golang 验证码                                                                                  |
| [go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)             | Javascript 验证码                                                                              |
| [go-captcha-vue](https://github.com/wenlng/go-captcha-vue)                 | Vue 验证码                                                                                     |
| [go-captcha-react](https://github.com/wenlng/go-captcha-react)             | React 验证码                                                                                   |
| [go-captcha-angular](https://github.com/wenlng/go-captcha-angular)         | Angular 验证码                                                                                 |
| [go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)           | Svelte 验证码                                                                                  |
| [go-captcha-solid](https://github.com/wenlng/go-captcha-solid)             | Solid 验证码                                                                                   |
| [go-captcha-uni](https://github.com/wenlng/go-captcha-uni)                 | UniApp 验证码，兼容 App、小程序、快应用等                                                                  |
| [go-captcha-service](https://github.com/wenlng/go-captcha-service)         | GoCaptcha 服务，支持二进制、Docker镜像等方式部署，<br/> 提供 HTTP/GRPC 方式访问接口，<br/>可用单机模式和分布式（服务发现、负载均衡、动态配置等） |
| [go-captcha-service-sdk](https://github.com/wenlng/go-captcha-service-sdk) | GoCaptcha 服务SDK工具包，包含 HTTP/GRPC 请求服务接口，<br/>支持静态模式、服务发现、负载均衡                                |
| ...                                                                        |                                                                                             |

<br/>


### 下载运行
```shell
git clone https://github.com/wenlng/go-captcha-example.git
cd go-captcha-example
go mod download
go run main.go
```

浏览器打开: http://127.0.0.1:9001/go-captcha-example

<br/>

### 目录结构
```text
|-golang  // Golang 实例
    |-internal                 
      |-app
      |-cache
      |-logic
        |-captdata
          |-click_basic.go      // 生成文本点选验证码数据
          |-click_basic_theme.go // 生成文本点选验证码数据 - 适配前端主题
          |-click_shape.go      // 生成图形点选验证码数据
          |-rotate_basic.go     // 生成旋转验证码数据
          |-slide_basic.go      // 生成滑动验证码数据
          |-slide_region.go     // 生成拖拽验证码数据
        |-checkdata
          |-click.go            // 点选验证码校验
          |-rotate.go           // 旋转验证码校验
          |-slide.go            // 滑动/拖拽验证码校验
|-web
  |-native                // Javascript 原生实例
  |-bower                 // Javascript 原生实例，bower工具管理
  |-vue                   // Vue3 实例
  |-vue2                  // Vue2 实例 vue2.7~vue3.0
  |-vue<2.7               // Vue2 实例 vue2.0~vue2.7
  |-react                 // React 实例
  |-angular               // Angular 实例
  |-solid                 // Solid 实例
  |-svelte                // Svelte 实例
  |-service                // Service 版本实例
|-app
  |-uniapp                // UniApp 实例，兼容支持vue2、vue3
```

<br/>

---------------------

## 👍 赞助一下
<div>
<a href="http://gocaptcha.wencodes.com/sponsor/" target="_blank">http://gocaptcha.wencodes.com/sponsor/</a>
</div>
<br/>
