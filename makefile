MAKEFILES := $(wildcard */makefile)
SUBDIRS := $(patsubst %/makefile,%,$(MAKEFILES))

bold := $(shell tput bold)
sgr0 := $(shell tput sgr0)

.PHONY: build
build: $(SUBDIRS)

.PHONY: clean
clean: $(SUBDIRS)

.PHONY: init
init: $(SUBDIRS)

.PHONY: package
package: $(SUBDIRS)

.PHONY: run
run: $(SUBDIRS)

.PHONY: $(SUBDIRS)
$(SUBDIRS):
	@printf '$(bold)===================================$(sgr0)\n'
	@printf '$(bold)==> $@: make $(MAKECMDGOALS)$(sgr0)\n'
	@$(MAKE) -C $@ $(MAKECMDGOALS)
	