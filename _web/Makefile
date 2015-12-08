.PHONY: prod debug apidoc prep clean
prod : clean deps apidoc
	grunt --siteurl=$(SITE_URL)

debug: clean prep
	grunt serve

apidoc:
	make -C apidoc
	cp -r apidoc/build/apidoc extgen

deps :
	virtualenv .pythonenv
	.pythonenv/bin/pip install -r requirements.txt
	npm install
	bower install

clean : 
	rm -r extgen/*
