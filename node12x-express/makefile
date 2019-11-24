.PHONY: build
build: function.zip

.PHONY: init
init: src/node_modules

.PHONY: run
run: init
	docker run --rm -v ${PWD}/src:/var/task lambci/lambda:nodejs12.x lambda.handler '{ "path": "/api/greet/Arthur%20Dent" }'

.PHONY: start
start: init
	(cd src; npm start)

.PHONY: test
test: init
	(cd src; npm test)


function.zip: src/node_modules
	docker run --rm -v ${PWD}/src:/var/task lambci/lambda:build-nodejs12.x npm rebuild
	rm function.zip
	(cd src; zip -r ../function.zip .)
	touch function.zip

src/node_modules: src/package.json src/package-lock.json
	(cd src; npm install)
	touch src/node_modules
