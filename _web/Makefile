.PHONY: prod debug apidoc prep
prod : prep apidoc
	grunt --siteurl=$(SITE_URL)

debug: prep
	grunt serve

apidoc:
	make -C apidoc
	cp -r apidoc/build/apidoc static

prep :
	virtualenv .pythonenv
	.pythonenv/bin/pip install -r requirements.txt
	npm install
	bower install
