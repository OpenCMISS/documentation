.PHONY: summary prod debug apidoc prep clean

APIDOC ?= yes

prod : summary clean deps apidoc
ifndef SITE_URL
	echo "Error: Site URL not set. Production builds will not work without site url being set to generate a sitemap. Set with SITE_URL=[url]"
	exit 1
endif
	grunt --siteurl=$(SITE_URL)

debug: summary clean prep apidoc
	grunt serve

summary:
ifeq ($(APIDOC),no)
	echo "API Documentation: disabled (API docs will not be included in the build. Only use this if you are generating the site for testing purposes.)"
endif

apidoc:
ifeq ($(APIDOC),yes)
	make -C apidoc
	cp -r apidoc/build/apidoc extgen
endif

deps :
	virtualenv .pythonenv
	.pythonenv/bin/pip install -r requirements.txt
	npm install
	bower install

clean :
	rm -rf extgen
	mkdir extgen
