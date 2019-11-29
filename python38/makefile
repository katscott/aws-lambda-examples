BUILD_DIR = dist
SRC_DIR = src

SRC_FILES = $(shell find $(SRC_DIR) -type f -name '*.py' | grep -v '_test.py' | grep -v 'local.py')
DIST_FILES = $(patsubst $(SRC_DIR)/%,$(BUILD_DIR)/%,$(SRC_FILES))


.PHONY: build
build: function.zip

.PHONY: clean-dist
clean-dist:
	rm -rf ./dist

.PHONY: dist
dist: dist/dist.txt $(DIST_FILES) dist/install.txt

.PHONY: generate-requirements
generate-requirements: requirements-dev.txt

.PHONY: init
init: .init

.PHONY: run
run:
	docker run --rm -v ${PWD}/src:/var/task lambci/lambda:python3.8 entrypoint.handler.run '{ "name": "Marvin" }'

.PHONY: test
test: init
	(cd src; pytest)


dist/dist.txt:
	$(MAKE) clean-dist
	mkdir -p ./dist
	touch dist/dist.txt

dist/install.txt: dist/requirements.txt
	docker run --rm -v ${PWD}/dist:/var/task lambci/lambda:build-python3.8 pip install -r requirements.txt --target .
	touch dist/install.txt

$(BUILD_DIR)/%.py: $(SRC_DIR)/%.py
	@echo "$< -> $@" && mkdir -p $@ 2> /dev/null || true && rm -d $@ && cp $< $@

dist/requirements.txt: dist/dist.txt requirements.txt
	cp requirements.txt dist/requirements.txt

function.zip: requirements.txt requirements-dev.txt dist
	rm -f function.zip
	(cd dist; zip -r ../function.zip .)
	touch function.zip

requirements.txt: requirements/requirements.in
	@command -v pip-compile >/dev/null 2>&1 || { echo >&2 "pip-compile is not available in path please install [pip install pip-tools]"; exit 1; }
	pip-compile --output-file requirements.txt requirements/requirements.in

requirements-dev.txt: requirements/requirements-dev.in requirements/requirements.in
	@command -v pip-compile >/dev/null 2>&1 || { echo >&2 "pip-compile is not available in path please install [pip install pip-tools]"; exit 1; }
	pip-compile --output-file requirements-dev.txt requirements/requirements-dev.in

.init: requirements-dev.txt
	pip install -r requirements-dev.txt
	touch .init