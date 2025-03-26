<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
</div>

<h3 style="text-align: center ">Go Captcha Example Projects</h3>

<br/>

> English | [中文](README_zh.md)
> 
<p style="text-align: center"><a href="https://github.com/wenlng/go-captcha">Go Captcha</a> is a behavior CAPTCHA, which implements text click verification, slide verification and rotation verification.</p>

<p style="text-align: center"> ⭐️ If it helps you, please give a star.</p>

<br/>

<div align="center"> 
    <img src="http://47.104.180.148/go-captcha/go-captcha-v1.png" alt="Poster">
</div>

<br/>
<hr/>
<br/>

## URL Index

| Name                                                        | URL                                                                                            |
|-------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| GoCaptcha Document        | [http://gocaptcha.wencodes.com](http://gocaptcha.wencodes.com)                               |
| Online Demo         | [http://gocaptcha.wencodes.com/demo/](http://gocaptcha.wencodes.com/demo/)                   |
| Golang + Web + APP Example | [https://github.com/wenlng/go-captcha-example](https://github.com/wenlng/go-captcha-example) |
| Golang Captcha      | [https://github.com/wenlng/go-captcha](https://github.com/wenlng/go-captcha)                 |
| Golang Assets File  | [https://github.com/wenlng/go-captcha-assets](https://github.com/wenlng/go-captcha-assets)   |
| Javascript Captcha  | [https://github.com/wenlng/go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)     |
| Vue Captcha         | [https://github.com/wenlng/go-captcha-vue](https://github.com/wenlng/go-captcha-vue)         |
| React Captcha       | [https://github.com/wenlng/go-captcha-react](https://github.com/wenlng/go-captcha-react)     |
| Angular Captcha     | [https://github.com/wenlng/go-captcha-angular](https://github.com/wenlng/go-captcha-angular) |
| Svelte Captcha      | [https://github.com/wenlng/go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)   |
| Solid Captcha       | [https://github.com/wenlng/go-captcha-solid](https://github.com/wenlng/go-captcha-solid)     |
| UniApp Captcha      | [https://github.com/wenlng/go-captcha-uni](https://github.com/wenlng/go-captcha-uni)         |
| ...                                                         |                                                                                              |


<br/>


### Example

```shell
git clone https://github.com/wenlng/go-captcha-example.git
cd go-captcha-example
go mod download
go run main.go
```

Open in browser: http://127.0.0.1:9001/go-captcha-example

<br/>

### Directory structure
```text
|-golang                    // Golang example
    |-internal                  
      |-app
      |-cache
      |-logic
        |-captdata
          |-click_basic.go      // Generation click text data
          |-click_shape.go      // Generation click shape data
          |-rotate_basic.go     // Generation rotate data
          |-slide_basic.go      // Generation slide data
          |-slide_region.go     // Generation drag data 
        |-checkdata
          |-click.go            // Check data for text
          |-rotate.go           // Check data for rotate
          |-slide.go            // Check data for slide
|-web
  |-native                // Js+Html+Css example
  |-bower                 // Js+Html+Css example, bower tool
  |-vue                   // Vue3 example
  |-vue2                  // Vue2 example
  |-react                 // React example
  |-angular               // Angular example
  |-solid                 // Solid example
  |-svelte                // Svelte example
|-app
  |-uniapp                // UniApp example
```

<br/>


