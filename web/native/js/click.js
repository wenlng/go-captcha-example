
var Captcha = (function () {
    var getCaptDataApi = window.GetCaptchaDataApi ? window.GetCaptchaDataApi : "/api/go-captcha-data/click-basic"
    var checkCaptDataApi = window.CheckCaptchaDataApi ? window.CheckCaptchaDataApi : "/api/go-captcha-check-data/click-basic"

    var captchaKey = ""
    var maxDot = 8
    var dots = []

    var hiddenClassName = "wg-cap-wrap__hidden"
    var dialogActiveClassName = "wg-cap-dialog__active"
    var activeDefaultClassName = "wg-cap-active__default"
    var activeOverClassName = "wg-cap-active__over"
    var activeErrorClassName = "wg-cap-active__error"
    var activeSuccessClassName = "wg-cap-active__success"

    var captchaWrapDom        = document.querySelector("#wg-cap-dots")
    var captchaImageDom       = document.querySelector("#wg-cap-image")
    var captchaThumbDom       = document.querySelector("#wg-cap-thumb")
    var captchaBtnControlDom  = document.querySelector("#wg-cap-btn-control")
    var captchaCheckBtnDom    = document.querySelector("#wg-cap-check-btn")
    var captchaCloseBtnDom    = document.querySelector("#wg-cap-close-btn")
    var captchaDialogBtnDom   = document.querySelector("#wg-cap-dialog")
    var captchaRefreshBtnDom  = document.querySelector("#wg-cap-refresh-btn")
    var captchaDefaultBtnDom  = document.querySelector("#wg-cap-btn-default")
    var captchaErrorBtnDom    = document.querySelector("#wg-cap-btn-error")
    var captchaOverBtnDom     = document.querySelector("#wg-cap-btn-over")
    var dialogDom             = document.querySelector("#wg-cap-container")

    function __initialize() {
        // requestCaptchaData()
        handleEvent()

        document.addEventListener('touchstart', (event) => {
            if (event.touches.length > 1) {
                event.preventDefault()
            }
        })
        document.addEventListener('gesturestart', (event) => {
            event.preventDefault()
        })
        document.body.addEventListener('touchend', () => { })
    }

    function handleEvent() {
        Helper.addEventListener(captchaImageDom, "click", handleClickPos, false)
        Helper.addEventListener(captchaCheckBtnDom, "click", handleClickCheck, false)
        Helper.addEventListener(captchaCloseBtnDom, "click", handleClickClose, false)
        Helper.addEventListener(captchaDialogBtnDom, "click", handleClickClose, false)
        Helper.addEventListener(captchaRefreshBtnDom, "click", handleClickRefresh, false)
        Helper.addEventListener(captchaDefaultBtnDom, "click", handleClickDefault, false)
        Helper.addEventListener(captchaErrorBtnDom, "click", handleClickDefault, false)
        Helper.addEventListener(captchaOverBtnDom, "click", handleClickDefault, false)
    }

    function appendDotIcon(event, x, y) {
        var dot = document.createElement('div')
        dot.setAttribute('class', 'wg-cap-wrap__dot')
        dot.setAttribute('style', 'top:' + (y - 11) + 'px; left:' + (x - 11) + 'px;')
        dot.innerHTML = '<span>'+ (dots.length + 1) +'</span>'
        captchaWrapDom.appendChild(dot)
        dots.push([x, y])
    }

    function resetCaptcha() {
        captchaKey = ""
        dots = []
        captchaWrapDom.innerHTML = ""
    }

    function clearImage() {
        captchaImageDom.setAttribute("src", "")
        captchaThumbDom.setAttribute("src", "")
    }

    function handleClickPos(ev){
        if (dots.length >= maxDot || captchaKey === "") {
            return
        }

        var e = ev || window.event;
        var dom = e.currentTarget

        var xy = Helper.getDomXY(dom)

        var mouseX = e.pageX || e.clientX
        var mouseY = e.pageY || e.clientY

        var domX = xy.domX
        var domY = xy.domY

        var xPos = mouseX - domX;
        var yPos = mouseY - domY;

        appendDotIcon(e, parseInt(xPos.toString()), parseInt(yPos.toString()))
        e.cancelBubble = true
        e.preventDefault()
        return false
    }

    function handleClickRefresh() {
        requestCaptchaData()
    }

    function handleClickClose() {
        dialogDom.classList.remove(dialogActiveClassName)
    }

    function handleClickCheck() {
        var dotsA = []
        dots.forEach(function (value, key) {
            dotsA.push(value.join(","))
        })

        if (dotsA.length <= 0) {
            alert("请点选图案进行验证")
            return
        }

        requestCheckCaptchaData({'dots': dotsA.join(','), 'key': captchaKey})
    }

    function handleClickDefault() {
        requestCaptchaData()
        dialogDom.classList.add(dialogActiveClassName)
    }

    function requestCaptchaData() {
        resetCaptcha()
        clearImage()
        captchaImageDom.classList.add(hiddenClassName)
        captchaThumbDom.classList.add(hiddenClassName)

        Ajax.get(getCaptDataApi, {}, function(data){
            if (data['code'] === 0) {
                captchaImageDom.classList.remove(hiddenClassName)
                captchaThumbDom.classList.remove(hiddenClassName)
                captchaImageDom.setAttribute("src", data['image_base64'])
                captchaThumbDom.setAttribute("src", data['thumb_base64'])
                captchaKey = data['captcha_key']
            } else {
                alert("请求验证码数据失败：" + data['message'])
            }
        }, function(e){
            console.log("请求验证码数据失败：" + e['message']);
        })
    }

    function requestCheckCaptchaData(dots) {
        Ajax.post(checkCaptDataApi, dots, function(data){
            captchaBtnControlDom.classList.remove(activeDefaultClassName)
            captchaBtnControlDom.classList.remove(activeOverClassName)
            if (data['code'] === 0) {
                alert("验证成功")
                captchaBtnControlDom.classList.remove(activeErrorClassName)
                captchaBtnControlDom.classList.add(activeSuccessClassName)
                setTimeout(function () {
                    handleClickClose()
                }, 200)
            } else {
                alert("验证失败")
                captchaBtnControlDom.classList.remove(activeSuccessClassName)
                captchaBtnControlDom.classList.add(activeErrorClassName)
                requestCaptchaData()
            }
        }, function(e){
            captchaBtnControlDom.classList.remove(activeDefaultClassName)
            captchaBtnControlDom.classList.remove(activeOverClassName)
            captchaBtnControlDom.classList.remove(activeSuccessClassName)
            captchaBtnControlDom.classList.add(activeErrorClassName)
            requestCaptchaData()
        }, function () {
            captchaKey = ""
        })
    }

    __initialize()
    return {}
})();