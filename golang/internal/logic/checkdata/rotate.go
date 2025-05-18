package checkdata

import (
	"encoding/json"
	"fmt"
	"go-captcha-example/internal/cache"
	"net/http"
	"strconv"

	"github.com/wenlng/go-captcha/v2/rotate"
)

// CheckRotateData .
func CheckRotateData(w http.ResponseWriter, r *http.Request) {
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

	angle := r.Form.Get("angle")
	key := r.Form.Get("key")
	if angle == "" || key == "" {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "angle or key param is empty",
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

	var dct *rotate.Block
	if err := json.Unmarshal(cacheDataByte, &dct); err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "illegal key",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	sAngle, _ := strconv.Atoi(angle)

	chkRet := rotate.Validate(sAngle, dct.Angle, 5)

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
