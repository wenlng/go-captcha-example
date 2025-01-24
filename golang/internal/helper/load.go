package helper

import (
	"image"
	"io"
	"os"
	"path"

	"github.com/golang/freetype"
	"github.com/golang/freetype/truetype"
	"github.com/wenlng/go-captcha/v2/base/codec"
)

// LoadJpeg .
func LoadJpeg(p string) (image.Image, error) {
	p = path.Join(GetPWD(), p)
	file, err := os.Open(p)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	dataByte, _ := io.ReadAll(file)
	return codec.DecodeByteToJpeg(dataByte)
}

// LoadPNG .
func LoadPNG(p string) (image.Image, error) {
	p = path.Join(GetPWD(), p)
	file, err := os.Open(p)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	dataByte, _ := io.ReadAll(file)
	return codec.DecodeByteToPng(dataByte)
}

// LoadFont .
func LoadFont(p string) (*truetype.Font, error) {
	p = path.Join(GetPWD(), p)
	file, err := os.Open(p)
	if err != nil {
		return nil, err
	}
	defer file.Close()
	dataByte, _ := io.ReadAll(file)
	return freetype.ParseFont(dataByte)
}
