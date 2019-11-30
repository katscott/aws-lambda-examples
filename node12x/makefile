PROJECT_PATH:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

BUILD_DIR = dist
SRC_DIR = src

SRC_FILES = $(shell find $(SRC_DIR) -type f -name '*.js' | grep -v '.test.js' | grep -v 'node_modules')
DIST_FILES = $(patsubst $(SRC_DIR)/%,$(BUILD_DIR)/%,$(SRC_FILES))

.PHONY: build
build: $(DIST_FILES)

.PHONY: clean
clean:
	@rm -rf ./dist
	@rm -f function.zip
	@rm -rf ./src/node_modules

.PHONY: init
init: src/node_modules

.PHONY: package
package: function.zip

.PHONY: run
run: build
	@docker run --rm -v $(PROJECT_PATH)/dist:/var/task lambci/lambda:nodejs12.x lambda.handler '{ "name": "Slartibartfast" }'
	
.PHONY: test
test: init
	@(cd src; npm test)


dist/dist.txt:
	@$(MAKE) clean
	@mkdir -p ./dist
	@touch dist/dist.txt

dist/node_modules: dist/package.json
	@(cd dist; npm install --only=prod)
	@touch dist/node_modules

dist/package.json: dist/dist.txt
	@cp src/package.json dist/package.json

$(BUILD_DIR)/%.js: $(SRC_DIR)/%.js dist/node_modules
	@echo "$< -> $@" && mkdir -p $@ 2> /dev/null || true && rm -d $@ && cp $< $@

function.zip: $(DIST_FILES)
	@docker run --rm -v $(PROJECT_PATH)/dist:/var/task lambci/lambda:build-nodejs12.x npm rebuild
	@rm -f function.zip
	@(cd dist; zip -r ../function.zip .)
	@touch function.zip

src/node_modules: src/package.json src/package-lock.json
	@(cd src; npm install)
	@touch src/node_modules
