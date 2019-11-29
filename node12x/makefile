BUILD_DIR = dist
SRC_DIR = src

SRC_FILES = $(shell find $(SRC_DIR) -type f -name '*.js' | grep -v '.test.js' | grep -v 'node_modules')
DIST_FILES = $(patsubst $(SRC_DIR)/%,$(BUILD_DIR)/%,$(SRC_FILES))

.PHONY: build
build: dist function.zip

.PHONY: clean-dist
clean-dist:
	rm -rf ./dist

.PHONY: dist
dist: dist/dist.txt $(DIST_FILES) dist/node_modules

.PHONY: init
init: src/node_modules

.PHONY: run
run: init
	docker run --rm -v ${PWD}/src:/var/task lambci/lambda:nodejs12.x lambda.handler '{ "name": "Slartibartfast" }'
	
.PHONY: test
test: init
	(cd src; npm test)


dist/dist.txt:
	$(MAKE) clean-dist
	mkdir -p ./dist
	touch dist/dist.txt

dist/node_modules: dist/package.json
	(cd dist; npm install --only=prod)
	touch src/node_modules

dist/package.json: dist/dist.txt
	cp src/package.json dist/package.json

$(BUILD_DIR)/%.js: $(SRC_DIR)/%.js
	@echo "$< -> $@" && mkdir -p $@ 2> /dev/null || true && rm -d $@ && cp $< $@

function.zip: dist/node_modules
	docker run --rm -v ${PWD}/dist:/var/task lambci/lambda:build-nodejs12.x npm rebuild
	rm -f function.zip
	(cd dist; zip -r ../function.zip .)
	touch function.zip

src/node_modules: src/package.json src/package-lock.json
	(cd src; npm install)
	touch src/node_modules
