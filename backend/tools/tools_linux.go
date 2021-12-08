// +build !windows

/**
 * @Author Awen
 * @Description
 * @Date 2021/7/21
 **/
package tools

import (
	"os"
	"syscall"
)

/**
 * @Description: 获取文件创建时间
 * @param path
 * @return int64
 */
func GetFileCreateTime(path string) int64{
	fileInfo, _ := os.Stat(path)

	stat_t := fileInfo.Sys().(*syscall.Stat_t)
	tCreate := int64(stat_t.Ctim.Sec)
	return tCreate
}
