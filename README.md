<h1 style="text-align: center">Go Captcha Example</h1>

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
      |-click_basic.go      // Generation text click mode captcha data
      |-click_shape.go      // Generation shape click mode captcha data
      |-rotate_basic.go     // Generation rotate mode captcha data
      |-slide_basic.go      // Generation slide mode captcha data
      |-slide_region.go     // Generation zone drag mode captcha data
    |-checkdata
      |-click.go            // Check interactive data for text mode
      |-rotate.go           // Check interactive data for rotate mode
      |-slide.go            // Check interactive data for slide mode
  |-static
    |-native                // js+html+css demo
    |-vue                   // vue demo
    |-react                 // react demo
```

<br/>

---------------------

<br/>

<p style="text-align: center"><a href="https://github.com/wenlng/go-captcha">Go Captcha</a> is a behavior security CAPTCHA, which implements text click verification, slide verification and rotation verification.</p>

<br/>

<div align="center"> 
    <img src="http://47.104.180.148/go-captcha/go-captcha-v1.png" alt="Poster">
</div>

<br/>

- GoCaptcha：[https://github.com/wenlng/go-captcha](https://github.com/wenlng/go-captcha)
- GoCaptcha Document：[http://gocaptcha.wencodes.com](http://gocaptcha.wencodes.com)
- Go Example：[https://github.com/wenlng/go-captcha-example](https://github.com/wenlng/go-captcha-example)
- Go Assets：[https://github.com/wenlng/go-captcha-assets](https://github.com/wenlng/go-captcha-assets)
- Vue Package：[https://github.com/wenlng/go-captcha-vue](https://github.com/wenlng/go-captcha-vue)
- React Package：[https://github.com/wenlng/go-captcha-react](https://github.com/wenlng/go-captcha-react)
- Online Demo：[http://gocaptcha.wencodes.com/demo](http://gocaptcha.wencodes.com/demo)
- ...
-
<br/>
