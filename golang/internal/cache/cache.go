package cache

import (
	"sync"
	"time"
)

// ====================================================================================
// ====================================================================================
// @TODO: In a production environment, caching middleware such as Redis would be used
// ====================================================================================
// ====================================================================================

// cachedata
type cachedata = struct {
	data     []byte
	createAt time.Time
}

var mux sync.RWMutex

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
	mux.RLock()
	defer mux.RUnlock()
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

// ClearCaches .
func ClearCaches(keys []string) {
	if len(keys) == 0 {
		return
	}

	mux.Lock()
	defer mux.Unlock()

	for _, key := range keys {
		delete(cachemaps, key)
	}
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
	mux.RLock()
	var keys = make([]string, 0)
	for key, data := range cachemaps {
		ex := time.Now().Unix() - data.createAt.Unix()
		if ex > (60 * 30) {
			keys = append(keys, key)
		}
	}
	mux.RUnlock()

	ClearCaches(keys)
}
