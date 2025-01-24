package helper

import (
	"crypto/md5"
	"encoding/hex"
	"os"
)

// GetPWD .
func GetPWD() string {
	path, err := os.Getwd()
	if err != nil {
		return ""
	}
	return path
}

// StringToMD5 MD5
func StringToMD5(src string) string {
	m := md5.New()
	m.Write([]byte(src))
	res := hex.EncodeToString(m.Sum(nil))
	return res
}
