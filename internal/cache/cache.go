package cache

import (
	"sync"
	"time"
)

type cachedata = struct {
	data     []byte
	createAt time.Time
}

var mux sync.Mutex

var cachemaps = make(map[string]*cachedata)

// WriteCache .
func WriteCache(key string, data []byte) {
	mux.Lock()
	defer mux.Unlock()
	cachemaps[key] = &cachedata{
		createAt: time.Now(),
		data:     data,
	}
}

// ReadCache .
func ReadCache(key string) []byte {
	mux.Lock()
	defer mux.Unlock()
	if cd, ok := cachemaps[key]; ok {
		return cd.data
	}

	return []byte{}
}

// ClearCache .
func ClearCache(key string) {
	mux.Lock()
	defer mux.Unlock()
	delete(cachemaps, key)
}

// RunTimedTask .
func RunTimedTask() {
	ticker := time.NewTicker(time.Minute * 5)
	go func() {
		for range ticker.C {
			checkCacheOvertimeFile()
		}
	}()
}

func checkCacheOvertimeFile() {
	var keys = make([]string, 0)
	for key, data := range cachemaps {
		ex := time.Now().Unix() - data.createAt.Unix()
		if ex > (60 * 30) {
			keys = append(keys, key)
		}
	}

	for _, key := range keys {
		ClearCache(key)
	}
}
