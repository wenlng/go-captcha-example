// +build windows

/**
 * @Author Awen
 * @Description
 * @Date 2021/7/21
 **/

package tools

import (
	"os"
	"runtime"
	"syscall"
	"time"
)

/**
 * @Description: 获取文件创建时间
 * @param path
 * @return int64
 */
func GetFileCreateTime(path string) int64{
	osType := runtime.GOOS
	fileInfo, _ := os.Stat(path)
	if osType == "windows" {
		wFileSys := fileInfo.Sys().(*syscall.Win32FileAttributeData)
		tNanSeconds := wFileSys.CreationTime.Nanoseconds()  /// 返回的是纳秒
		tSec := tNanSeconds / 1e9                             ///秒
		return tSec
	}

	return time.Now().Unix()
}