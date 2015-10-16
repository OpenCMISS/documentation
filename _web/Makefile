prod : prep
	grunt --siteurl=$(SITE_URL)

debug: prep
	grunt serve

prep :
	virtualenv .pythonenv
	.pythonenv/bin/pip install -r requirements.txt
	npm install
	bower install
