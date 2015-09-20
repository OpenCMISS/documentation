prod : prep
	grunt

debug: prep
	grunt serve

prep :
	virtualenv .pythonenv
	.pythonenv/bin/pip install -r requirements.txt
	npm install
	bower install
