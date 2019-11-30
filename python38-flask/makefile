PROJECT_PATH:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

BUILD_DIR = dist
SRC_DIR = src

SRC_FILES = $(shell find $(SRC_DIR) -type f -name '*.py' | grep -v '_test.py' | grep -v 'local.py')
DIST_FILES = $(patsubst $(SRC_DIR)/%,$(BUILD_DIR)/%,$(SRC_FILES))


.PHONY: build
build: $(DIST_FILES)

.PHONY: clean
clean:
	@rm -rf ./dist
	@rm -f function.zip
	@rm -f .init

.PHONY: generate-requirements
generate-requirements: requirements.txt requirements-dev.txt

.PHONY: init
init: generate-requirements .init

.PHONY: package
package: function.zip

.PHONY: run
run: build
	@docker run -v $(PROJECT_PATH)/dist:/var/task lambci/lambda:python3.8 entrypoint.handler.run '{ "queryStringParameters": "", "httpMethod": "GET", "headers": { "Accept": "application/json", "Content-Type": "application/json" }, "path": "/greet/Humma%20Kavula" }'

.PHONY: start
start:
	@(cd src; python local.py)

.PHONY: test
test: init
	@(cd src; pytest)



dist/dist.txt:
	@$(MAKE) clean
	@mkdir -p ./dist
	@touch dist/dist.txt

dist/install.txt: dist/requirements.txt
	@docker run --rm -v $(PROJECT_PATH)/dist:/var/task lambci/lambda:build-python3.8 pip install -r requirements.txt --target .
	@touch dist/install.txt

$(BUILD_DIR)/%.py: $(SRC_DIR)/%.py dist/install.txt
	@echo "$< -> $@" && mkdir -p $@ 2> /dev/null || true && rm -d $@ && cp $< $@

dist/requirements.txt: dist/dist.txt requirements.txt
	@cp requirements.txt dist/requirements.txt

function.zip: $(DIST_FILES)
	@rm -f function.zip
	@(cd dist; zip -r ../function.zip .)
	@touch function.zip

requirements.txt: requirements/requirements.in
	@command -v pip-compile >/dev/null 2>&1 || { echo >&2 "pip-compile is not available in path please install [pip install pip-tools]"; exit 1; }
	@pip-compile --output-file requirements.txt requirements/requirements.in

requirements-dev.txt: requirements/requirements-dev.in requirements/requirements.in
	@command -v pip-compile >/dev/null 2>&1 || { echo >&2 "pip-compile is not available in path please install [pip install pip-tools]"; exit 1; }
	@pip-compile --output-file requirements-dev.txt requirements/requirements-dev.in

.init: requirements-dev.txt
	@pip install -r requirements-dev.txt
	@touch .init
