<h1 style="text-align: center ">Go Captcha Example</h1>

<br/>

<p style="text-align: center"><a href="https://github.com/wenlng/go-captcha">Go Captcha</a> is a behavior security CAPTCHA, which implements text click verification, slide verification and rotation verification.</p>

<p style="text-align: center"> ⭐️ If it helps you, please give a star.</p>

<br/>

<div align="center"> 
    <img src="http://47.104.180.148/go-captcha/go-captcha-v1.png" alt="Poster">
</div>

<br/>

- GoCaptcha：[https://github.com/wenlng/go-captcha](https://github.com/wenlng/go-captcha)
- GoCaptcha Document：[http://gocaptcha.wencodes.com](http://gocaptcha.wencodes.com)
- Go Example：[https://github.com/wenlng/go-captcha-example](https://github.com/wenlng/go-captcha-example)
- Go Assets File：[https://github.com/wenlng/go-captcha-assets](https://github.com/wenlng/go-captcha-assets)
- Javascript Library：[https://github.com/wenlng/go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)
- Vue Package：[https://github.com/wenlng/go-captcha-vue](https://github.com/wenlng/go-captcha-vue)
- React Package：[https://github.com/wenlng/go-captcha-react](https://github.com/wenlng/go-captcha-react)
- Angular Package：[https://github.com/wenlng/go-captcha-angular](https://github.com/wenlng/go-captcha-angular)
- Svelte Package：[https://github.com/wenlng/go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)
- Solid Package：[https://github.com/wenlng/go-captcha-solid](https://github.com/wenlng/go-captcha-solid)
- Online Demo：[http://gocaptcha.wencodes.com/demo](http://gocaptcha.wencodes.com/demo)
- ...

<br/>

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
|-internal
  |-app
  |-cache
  |-logic
    |-captdata
      |-click_basic.go      // Generation data for text click
      |-click_shape.go      // Generation data for shape click
      |-rotate_basic.go     // Generation data for rotate
      |-slide_basic.go      // Generation data for slide
      |-slide_region.go     // Generation data for drag region
    |-checkdata
      |-click.go            // Check data for text
      |-rotate.go           // Check data for rotate
      |-slide.go            // Check data for slide
|-web
  |-native                // js+html+css example
  |-bower                 // js+html+css example, bower tool
  |-vue                   // vue3 example
  |-vue2                  // vue2 example
  |-react                 // react example
  |-angular               // angular example
  |-solid                 // solid example
  |-svelte                // svelte example
```

<br/>

---------------------

## 👍 Sponsor
<div>
<a href="http://gocaptcha.wencodes.com/sponsor/" target="_blank">http://gocaptcha.wencodes.com/sponsor/</a>
</div>
<br/>
