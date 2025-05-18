package checkdata

import (
	"encoding/json"
	"fmt"
	"go-captcha-example/internal/cache"
	"net/http"
	"strconv"
	"strings"

	"github.com/wenlng/go-captcha/v2/slide"
)

// CheckSlideData .
func CheckSlideData(w http.ResponseWriter, r *http.Request) {
	code := 1
	err := r.ParseForm()
	if err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "parse form data err",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	point := r.Form.Get("point")
	key := r.Form.Get("key")
	if point == "" || key == "" {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "point or key param is empty",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	cacheDataByte := cache.ReadCache(key)
	if len(cacheDataByte) == 0 {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "illegal key",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}
	src := strings.Split(point, ",")

	var dct *slide.Block
	if err := json.Unmarshal(cacheDataByte, &dct); err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "illegal key",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	chkRet := false
	if 2 == len(src) {
		sx, _ := strconv.Atoi(src[0])
		sy, _ := strconv.Atoi(src[1])

		chkRet = slide.Validate(sx, sy, dct.X, dct.Y, 5)
	}

	if chkRet {
		code = 0
		cache.SetCacheOk(key, true)
	}

	bt, _ := json.Marshal(map[string]interface{}{
		"code": code,
	})
	_, _ = fmt.Fprintf(w, string(bt))
	return
}
