html: init clean sync
	cp -r zinc .working
	cp LibZincDoxygen/api_2_api++_doc.py .working
	cp -r LibZincDoxygen/libzinc_doxgen_script .working
	cd .working; python api_2_api++_doc.py
	cd .working/libzinc_doxgen_script; doxygen cpp_comments.doxygen
	mkdir -p build/zinc-apidoc/latest/
	cp -r .working/libzinc_doxgen_script/libzinc_dox_output/html/* build/zinc-apidoc/latest

sync:
	svn up zinc --accept theirs-full # If any conflict arises, take the source repository.

clean:
	rm -rf .working
	rm -rf build

init:
	svn co https://svn.physiomeproject.org/svn/cmiss/zinc/library/trunk/ zinc
