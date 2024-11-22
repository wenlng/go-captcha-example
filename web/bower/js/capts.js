axios.defaults.baseURL = 'http://47.104.180.148:8081/';

function toastSuccess(msg) {
  Toastify({
    text: msg,
    duration: 1000,
    newWindow: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#f0f9eb",
      border: "1px solid #dcf9cc",
      color: "#5eaa2f",
      borderRadius: "6px",
      boxShadow: "1px 1px 10px #e0e0e0",
      padding: "8px 20px"
    },
  }).showToast();
}

function toastError(msg) {
  Toastify({
    text: msg,
    duration: 1000,
    newWindow: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#fef0f0",
      border: "1px solid #fcd6d6",
      color: "#ed4630",
      borderRadius: "6px",
      boxShadow: "1px 1px 10px #e0e0e0",
      padding: "8px 20px"
    },
  }).showToast();
}

// Click Example
;(function (goCaptcha){
  const getDataApi = "/api/go-captcha-data/click-basic";
  const checkDataApi = "/api/go-captcha-check-data/click-basic";

  const el = document.getElementById("click-wrap");
  const capt = new goCaptcha.Click({
    width: 300,
    height: 220,
    // iconSize: 30,
  });

  var captKey = ''

  capt.mount(el)

  capt.setEvents({
    click(x,  y) {
      console.log('click - ', x, y)
    },
    confirm(dots, reset) {
      confirmEvent(dots)
    },
    refresh() {
      capt.clear()
      requestCaptchaData()
    },
    close() {
      console.log('>>>>> close')
    }
  })

  const requestCaptchaData = function() {
    capt.clear()
    captKey = ''
    axios({
      method: 'get',
      url: getDataApi,
    }).then(function(response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        capt.setData({
          image: data['image_base64'] || '',
          thumb: data['thumb_base64'] || '',
        })
        captKey = data['captcha_key'] || ''
      } else {
        toastError(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const confirmEvent = function (dots) {
    const dotArr = []
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i]
      dotArr.push(dot.x, dot.y)
    }

    axios({
      method: 'post',
      url: checkDataApi,
      data: Qs.stringify({
        dots: dotArr.join(','),
        key: captKey || ''
      }),
    }).then(function (response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        toastSuccess(`check data success`)
      } else {
        toastError(`check data failed`)
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 500)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  requestCaptchaData()
})(window.GoCaptcha || {})

// Slide Example
;(function (goCaptcha){
  const getDataApi = "/api/go-captcha-data/slide-basic";
  const checkDataApi = "/api/go-captcha-check-data/slide-basic";

  const el = document.getElementById("slide-wrap");
  const capt = new goCaptcha.Slide({
    width: 300,
    height: 220,
  });

  var captKey = ''

  capt.mount(el)

  capt.setEvents({
    move(x,  y) {
      console.log('move - ', x, y)
    },
    confirm(dots, reset) {
      confirmEvent(dots)
    },
    refresh() {
      capt.clear()
      requestCaptchaData()
    },
    close() {
      console.log('>>>>> close')
    }
  })

  const requestCaptchaData = function() {
    capt.clear()
    captKey = ''
    axios({
      method: 'get',
      url: getDataApi,
    }).then(function(response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        capt.setData({
          image: data['image_base64'] || '',
          thumb: data['tile_base64'] || '',
          thumbX: data['tile_x'] || 0,
          thumbY: data['tile_y'] || 0,
          thumbWidth: data['tile_width'] || 0,
          thumbHeight: data['tile_height'] || 0,
        })

        captKey = data['captcha_key'] || ''
      } else {
        toastError(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const confirmEvent = function (point) {
    axios({
      method: 'post',
      url: checkDataApi,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
        key: captKey || ''
      }),
    }).then(function (response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        toastSuccess(`check data success`)
      } else {
        toastError(`check data failed`)
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 500)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  requestCaptchaData()
})(window.GoCaptcha || {})

// SlideRegion Example
;(function (goCaptcha){
  const getDataApi = "/api/go-captcha-data/slide-region";
  const checkDataApi = "/api/go-captcha-check-data/slide-region";

  const el = document.getElementById("slide-region-wrap");
  const capt = new goCaptcha.SlideRegion({
    width: 300,
    height: 220,
  });

  var captKey = ''

  capt.mount(el)

  capt.setEvents({
    move(x,  y) {
      console.log('move - ', x, y)
    },
    confirm(dots, reset) {
      confirmEvent(dots)
    },
    refresh() {
      capt.clear()
      requestCaptchaData()
    },
    close() {
      console.log('>>>>> close')
    }
  })

  const requestCaptchaData = function() {
    capt.clear()
    captKey = ''
    axios({
      method: 'get',
      url: getDataApi,
    }).then(function(response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        capt.setData({
          image: data['image_base64'] || '',
          thumb: data['tile_base64'] || '',
          thumbX: data['tile_x'] || 0,
          thumbY: data['tile_y'] || 0,
          thumbWidth: data['tile_width'] || 0,
          thumbHeight: data['tile_height'] || 0,
        })

        captKey = data['captcha_key'] || ''
      } else {
        toastError(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const confirmEvent = function (point) {
    axios({
      method: 'post',
      url: checkDataApi,
      data: Qs.stringify({
        point: [point.x, point.y].join(','),
        key: captKey || ''
      }),
    }).then(function (response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        toastSuccess(`check data success`)
      } else {
        toastError(`check data failed`)
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 500)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  requestCaptchaData()
})(window.GoCaptcha || {})


// Rotate Example
;(function (goCaptcha){
  const getDataApi = "/api/go-captcha-data/rotate-basic";
  const checkDataApi = "/api/go-captcha-check-data/rotate-basic";

  const el = document.getElementById("rotate-wrap");
  const capt = new goCaptcha.Rotate({
    width: 300,
    height: 220,
  });

  var captKey = ''

  capt.mount(el)

  capt.setEvents({
    move(x,  y) {
      console.log('move - ', x, y)
    },
    confirm(dots, reset) {
      confirmEvent(dots)
    },
    refresh() {
      capt.clear()
      requestCaptchaData()
    },
    close() {
      console.log('>>>>> close')
    }
  })

  const requestCaptchaData = function() {
    capt.clear()
    captKey = ''
    axios({
      method: 'get',
      url: getDataApi,
    }).then(function(response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        capt.setData({
          image: data['image_base64'] || '',
          thumb: data['thumb_base64'] || '',
        })

        captKey = data['captcha_key'] || ''
      } else {
        toastError(`get data failed`)
      }
    }).catch((e)=>{
      console.warn(e)
    })
  }

  const confirmEvent = function (angle) {
    axios({
      method: 'post',
      url: checkDataApi,
      data: Qs.stringify({
        angle: angle,
        key: captKey || ''
      }),
    }).then(function (response){
      const data = response.data || {};
      if (data && (data['code'] || 0) === 0) {
        toastSuccess(`check data success`)
      } else {
        toastError(`check data failed`)
      }

      setTimeout(() => {
        requestCaptchaData()
      }, 500)
    }).catch((e)=>{
      console.warn(e)
    })
  }

  requestCaptchaData()
})(window.GoCaptcha || {})


// Button Example
;(function (goCaptcha){
  const el = document.getElementById("button-wrap");
  const capt = new goCaptcha.Button({
    width: 300,
    height: 28,
  });
  capt.mount(el)
  capt.setState({
    clickEvent: () => {
      toastSuccess(`Hello GoCaptcha!`)
    }
  })
})(window.GoCaptcha || {})

