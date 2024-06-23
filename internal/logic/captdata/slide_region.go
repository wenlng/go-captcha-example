package captdata

import (
	"encoding/json"
	"fmt"
	"go-captcha-example/internal/cache"
	"go-captcha-example/internal/helper"
	"log"
	"net/http"

	"github.com/wenlng/go-captcha-assets/resources/images"
	"github.com/wenlng/go-captcha-assets/resources/tiles"
	"github.com/wenlng/go-captcha/v2/slide"
)

var slideRegionCapt slide.Captcha

func init() {
	builder := slide.NewBuilder(
		slide.WithGenGraphNumber(2),
		slide.WithEnableGraphVerticalRandom(true),
	)

	// background image
	imgs, err := images.GetImages()
	if err != nil {
		log.Fatalln(err)
	}

	graphs, err := tiles.GetTiles()
	if err != nil {
		log.Fatalln(err)
	}
	var newGraphs = make([]*slide.GraphImage, 0, len(graphs))
	for i := 0; i < len(graphs); i++ {
		graph := graphs[i]
		newGraphs = append(newGraphs, &slide.GraphImage{
			OverlayImage: graph.OverlayImage,
			MaskImage:    graph.MaskImage,
			ShadowImage:  graph.ShadowImage,
		})
	}

	// set resources
	builder.SetResources(
		slide.WithGraphImages(newGraphs),
		slide.WithBackgrounds(imgs),
	)

	slideRegionCapt = builder.MakeWithRegion()
}

// GetSlideRegionCaptData .
func GetSlideRegionCaptData(w http.ResponseWriter, r *http.Request) {
	captData, err := slideRegionCapt.Generate()
	if err != nil {
		log.Fatalln(err)
	}

	blockData := captData.GetData()
	if blockData == nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    1,
			"message": "gen captcha data failed",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	var masterImageBase64, tileImageBase64 string
	masterImageBase64 = captData.GetMasterImage().ToBase64()
	if err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    1,
			"message": "base64 data failed",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	tileImageBase64 = captData.GetTileImage().ToBase64()
	if err != nil {
		bt, _ := json.Marshal(map[string]interface{}{
			"code":    1,
			"message": "base64 data failed",
		})
		_, _ = fmt.Fprintf(w, string(bt))
		return
	}

	blockByte, _ := json.Marshal(blockData)
	key := helper.StringToMD5(string(blockByte))
	cache.WriteCache(key, blockByte)

	bt, _ := json.Marshal(map[string]interface{}{
		"code":         0,
		"captcha_key":  key,
		"image_base64": masterImageBase64,
		"tile_base64":  tileImageBase64,
		"tile_width":   blockData.Width,
		"tile_height":  blockData.Height,
		"tile_x":       blockData.TileX,
		"tile_y":       blockData.TileY,
	})
	_, _ = fmt.Fprintf(w, string(bt))
}
