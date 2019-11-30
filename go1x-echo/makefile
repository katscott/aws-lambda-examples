PROJECT_PATH:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

SRC_DIR = src
SRC_FILES = $(shell find $(SRC_DIR) -type f -name '*.go' | grep -v '_test.go')

.PHONY: build
build: handler

.PHONY: clean
clean:
	@rm -f handler
	@rm -f function.zip

.PHONY: init
init:
	@(cd src; go mod download)

.PHONY: package
package: function.zip

.PHONY: run
run: build
	@docker run --rm -v $(PROJECT_PATH):/var/task:ro,delegated lambci/lambda:go1.x handler '{ "httpMethod": "GET", "headers": { "Accept": "application/json", "Content-Type": "application/json" }, "path": "/greet/Humma%20Kavula" }'
	
.PHONY: test
test: init
	@(cd src; go test ./...)


handler: $(SRC_FILES)
	@docker run --rm -v $(PROJECT_PATH)/src:/go/src/handler lambci/lambda:build-go1.x go build cmd/handler.go
	@rm -f handler
	@mv src/handler handler
	@touch handler

function.zip: handler
	@rm -f function.zip
	@(zip function.zip handler)
	@touch function.zip
