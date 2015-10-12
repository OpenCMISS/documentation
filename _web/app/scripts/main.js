"use strict";
(function(){
	window.FrontPageBanner = function(container){
		this.heartModel = new ZincScene(container,'data/fpmodel/coro','assets/app-showcase/heart.png');
		if (this.heartModel.willLoadModel){
			var sceneElement = this.heartModel.getSceneElement();
			this.heartModel.startLoading();
			this.heartModel.setBackgroundColor(new THREE.Color("rgb(144,144,144)"),1);
			this._setupEventPassthrough(container.getElementsByClassName('overlay'),sceneElement);
		}
	};

	FrontPageBanner.prototype._setupEventPassthrough = function (overlayElements,grabbableElement){
		var firstOverlay = overlayElements.item(0);
		for (var i = 0; i<overlayElements.length;i++){
			var element = overlayElements.item(i);
			var _markActive = function(event){
				if (event.target === grabbableElement) return;
				for (var i = 0; i<overlayElements.length;i++){
					overlayElements.item(i).classList.add('active');
				}
			};
			var _unmarkActive = function(event){
				if (event.target === grabbableElement) return;
				for (var i = 0; i<overlayElements.length;i++){
					overlayElements.item(i).classList.remove('active');
				}
			};

			element.addEventListener('mousedown',_markActive);
			element.addEventListener('touchstart',_markActive);
			element.addEventListener('mouseup',_unmarkActive);
			element.addEventListener('touchend',_unmarkActive);

		}
		var _enablePassthrough = function(){
			if (firstOverlay.classList.contains('active')) return;
			for (var i = 0; i<overlayElements.length;i++){
				overlayElements.item(i).classList.add('passthrough');
			}
		};

		var _disablePassthrough = function(){
			for (var i = 0; i<overlayElements.length;i++){
				overlayElements.item(i).classList.remove('passthrough');
				overlayElements.item(i).classList.remove('active');
			}
		};
		grabbbableElement.addEventListener('mousedown',_enablePassthrough);
		grabbbableElement.addEventListener('touchstart',_enablePassthrough);
		grabbbableElement.addEventListener('mouseup',_disablePassthrough);
		grabbbableElement.addEventListener('touchend',_disablePassthrough);

		document.body.addEventListener('mouseup',_disablePassthrough);
	}
}());
