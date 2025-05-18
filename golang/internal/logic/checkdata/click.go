package checkdata

import (
	"encoding/json"
	"fmt"
	"go-captcha-example/internal/cache"
	"net/http"
	"strconv"
	"strings"

	"github.com/wenlng/go-captcha/v2/click"
)

// CheckClickData .
func CheckClickData(w http.ResponseWriter, r *http.Request) {
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

	dots := r.Form.Get("dots")
	key := r.Form.Get("key")
	if dots == "" || key == "" {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "dots or key param is empty",
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
	src := strings.Split(dots, ",")

	var dct map[int]*click.Dot
	if err := json.Unmarshal(cacheDataByte, &dct); err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    code,
			"message": "illegal key",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	chkRet := false
	if (len(dct) * 2) == len(src) {
		for i := 0; i < len(dct); i++ {
			dot := dct[i]
			j := i * 2
			k := i*2 + 1
			sx, _ := strconv.Atoi(src[j])
			sy, _ := strconv.Atoi(src[k])

			chkRet = click.Validate(sx, sy, dot.X, dot.Y, dot.Width, dot.Height, 5)
			if !chkRet {
				break
			}
		}
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
