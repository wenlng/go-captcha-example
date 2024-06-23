PROJECT=go-captcha-example
GO ?= go
GOFMT ?= gofmt "-s"
GOFILES := $(shell find . -name "*.go")
LDFLAGS := -s -w

.PHONY: build-win
build-win:
	env CGO_ENABLED=0 GOOS=windows go build -ldflags "$(LDFLAGS)" -o $(PROJECT).exe ./main.go
	@echo "Build project for Windows successfully"

.PHONY: build-mac
build-mac:
	env CGO_ENABLED=0 GOOS=darwin go build -ldflags "$(LDFLAGS)" -o $(PROJECT) ./main.go
	@echo "Build project for MacOS successfully"

.PHONY: build-linux
build-linux:
	env CGO_ENABLED=0 GOOS=linux go build -ldflags "$(LDFLAGS)" -o $(PROJECT) ./main.go
	@echo "Build project for Linux successfully"
