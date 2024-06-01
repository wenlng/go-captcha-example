package app

import (
	"go-captcha-example/internal/cache"
	"go-captcha-example/internal/helper"
	"go-captcha-example/internal/logic/captdata"
	"go-captcha-example/internal/logic/checkdata"
	"log"
	"net/http"
	"path"
)

func Start() {

	// example: get captcha data
	http.Handle("/api/go-captcha-data/click-basic", CORS(http.HandlerFunc(captdata.GetClickBasicCaptData)))
	http.Handle("/api/go-captcha-data/click-shape", CORS(http.HandlerFunc(captdata.GetClickShapesCaptData)))
	http.Handle("/api/go-captcha-data/slide-basic", CORS(http.HandlerFunc(captdata.GetSlideBasicCaptData)))
	http.Handle("/api/go-captcha-data/slide-region", CORS(http.HandlerFunc(captdata.GetSlideRegionCaptData)))
	http.Handle("/api/go-captcha-data/rotate-basic", CORS(http.HandlerFunc(captdata.GetRotateBasicCaptData)))

	// example: post check data
	http.Handle("/api/go-captcha-check-data/click-basic", CORS(http.HandlerFunc(checkdata.CheckClickData)))
	http.Handle("/api/go-captcha-check-data/click-shape", CORS(http.HandlerFunc(checkdata.CheckClickData)))
	http.Handle("/api/go-captcha-check-data/slide-basic", CORS(http.HandlerFunc(checkdata.CheckSlideData)))
	http.Handle("/api/go-captcha-check-data/slide-region", CORS(http.HandlerFunc(checkdata.CheckSlideData)))
	http.Handle("/api/go-captcha-check-data/rotate-basic", CORS(http.HandlerFunc(checkdata.CheckRotateData)))

	// example: js+html+css
	viewStatic := path.Join(helper.GetPWD(), "/static/native/")
	viewFsh := http.FileServer(http.Dir(viewStatic))
	http.Handle("/go-captcha-example/", http.StripPrefix("/go-captcha-example/", viewFsh))

	// Example: vue
	static := path.Join(helper.GetPWD(), "/static/vue/")
	fsh := http.FileServer(http.Dir(static))
	http.Handle("/go-captcha-demo/", http.StripPrefix("/go-captcha-demo/", fsh))

	cache.RunTimedTask()

	log.Println(">>>> ListenAndServe 0.0.0.0:9001")
	err := http.ListenAndServe(":9001", nil)
	if err != nil {
		log.Fatal("ListenAndServe err: ", err)
	}
}
