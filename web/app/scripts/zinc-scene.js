"use strict";
(function(){

	window.ZincScene = function(root,modelNs,placeholderUrl){
		this.root = root;
		this.placeholderUrl = placeholderUrl;
		this._loadingClassName = 'scene-model-loading';
		this._placeholderClassName = 'scene-model-placeholder';
		this.modelNs = modelNs;
		this.isModelCapable = Modernizr.webgl;
		var placeholderImg = document.createElement('img');
		placeholderImg.setAttribute('src',placeholderUrl);
		placeholderImg.setAttribute('class',this._placeholderClassName);
		root.appendChild(placeholderImg);
		if (!this.isModelCapable) return this;
		this.loadingIndicator = this._buildLoadingIndicator();
		root.appendChild(this.loadingIndicator);
		this.renderer = new Zinc.Renderer(root, window);
		this.renderer.initialiseVisualisation();
	};

	ZincScene.prototype.startLoading = function(){
		this.renderer.loadFromViewURL(this.modelNs,this._onModelProgress.bind(this));
		this.renderer.animate();
	};

	ZincScene.prototype.setDefaultColour = function(colour){
		this.renderer.defaultColour = colour;
		return this;
	};

	ZincScene.prototype._buildLoadingIndicator = function(totalFiles){
		var loadingIndicator = document.createElement('div');
		loadingIndicator.setAttribute('class',this._loadingClassName);
		loadingIndicator.innerHTML = "<p>Loading...</p>";
		return loadingIndicator;
	}


	ZincScene.prototype._showScene = function(){
		$(this.root).find('.'+this._placeholderClassName).fadeOut();
		$(this.root).find('.'+this._loadingClassName).fadeOut();
		$(this.root).find('canvas').fadeIn();
	};

	ZincScene.prototype._onModelProgress = function(progress,totalFiles){
		var loadingIndicator = this.root.getElementsByClassName(this._loadingClassName)[0];
		if (!loadingIndicator) return;
		if (totalFiles - progress > 0){
			loadingIndicator.innerHTML = '<p>Loading '+(progress+1)+' of ' + totalFiles + ' files...</p>';
		} else {
			this._showScene();
		}
	};

	ZincScene.prototype.setDimension = function(height,width){
		var $root = $(this.root);
		$root.css({
			'height':height+'px',
			'width': width+'px',
			'position': 'relative'});

		return this;
	};
}());
