.PHONY: init


init:
	git config core.hooksPath .githooks
	chmod +x .githooks/*
