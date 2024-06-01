
const Captcha = (function () {
    const getCaptDataApi = window.GetCaptchaDataApi ? window.GetCaptchaDataApi : "/api/go-captcha-data/click-basic"
    const checkCaptDataApi = window.CheckCaptchaDataApi ? window.CheckCaptchaDataApi : "/api/go-captcha-check-data/click-basic"

    var captchaKey = ""
    var maxDot = 8
    var dots = []

    const hiddenClassName = "wg-cap-wrap__hidden"
    const dialogActiveClassName = "wg-cap-dialog__active"
    const activeDefaultClassName = "wg-cap-active__default"
    const activeOverClassName = "wg-cap-active__over"
    const activeErrorClassName = "wg-cap-active__error"
    const activeSuccessClassName = "wg-cap-active__success"

    const captchaWrapDom        = document.querySelector("#wg-cap-dots")
    const captchaImageDom       = document.querySelector("#wg-cap-image")
    const captchaThumbDom       = document.querySelector("#wg-cap-thumb")
    const captchaBtnControlDom  = document.querySelector("#wg-cap-btn-control")
    const captchaCheckBtnDom    = document.querySelector("#wg-cap-check-btn")
    const captchaCloseBtnDom    = document.querySelector("#wg-cap-close-btn")
    const captchaDialogBtnDom   = document.querySelector("#wg-cap-dialog")
    const captchaRefreshBtnDom  = document.querySelector("#wg-cap-refresh-btn")
    const captchaDefaultBtnDom  = document.querySelector("#wg-cap-btn-default")
    const captchaErrorBtnDom    = document.querySelector("#wg-cap-btn-error")
    const captchaOverBtnDom     = document.querySelector("#wg-cap-btn-over")
    const dialogDom             = document.querySelector("#wg-cap-container")

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
        const dot = document.createElement('div')
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

        const e = ev || window.event;
        const dom = e.currentTarget

        const xy = Helper.getDomXY(dom)

        const mouseX = e.pageX || e.clientX
        const mouseY = e.pageY || e.clientY

        const domX = xy.domX
        const domY = xy.domY

        const xPos = mouseX - domX;
        const yPos = mouseY - domY;

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
        const dotsA = []
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