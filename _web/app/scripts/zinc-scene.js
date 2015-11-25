"use strict";
(function(){

	function fadeIn(el) {
		el.style.opacity = 0;

		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
			last = +new Date();

			if (+el.style.opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
			}
		};

		tick();
	}

	function mergeOptionWithDefaults(defaultConfig, config){
		// Merge default configuration with configuration that's changed.
		if (config === undefined || config === null || typeof config !== "object"){
			config = {};
		}
		for (var attr in defaultConfig) {
			if (config[attr] === undefined || config[attr] === null) {
				config[attr] = defaultConfig[attr];
			}
		}
		return config;
	};

	function fadeOut(el) {
		el.style.opacity = 1;

		var last = +new Date();
		var tick = function() {
			el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
			last = +new Date();

			if (+el.style.opacity > 0) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
			}
		};

		tick();
	}


	function isWebGLCapable(){
		if (typeof Modernizr !== "undefined"){
			return Modernizr.webgl;
		} else {
			console.warn("Modernizr not included, could not detect whether webgl is enabled in browser.");
			return true;
		}
	}

	window.ZincScene = function(container,modelNs,placeholderUrl){
		var sceneEl = document.createElement('div');
		sceneEl.setAttribute('class',"zinc-scene");
		container.appendChild(sceneEl);
		this.root = sceneEl;
		this.willLoadModel = isWebGLCapable();
		this.placeholderUrl = placeholderUrl;
		this._loadingClassName = 'loading';
		this._placeholderClassName = 'placeholder';
		this.modelNs = modelNs;
		var placeholderImg = document.createElement('img');
		placeholderImg.setAttribute('src',placeholderUrl);
		placeholderImg.setAttribute('class',this._placeholderClassName);
		this.root.appendChild(placeholderImg);
		if (!this.willLoadModel) return this;
		this.loadingIndicator = this._buildLoadingIndicator();
		this.root.appendChild(this.loadingIndicator);
		this.root.appendChild(this._makeResetButton());
		this.renderer = new Zinc.Renderer(this.root, window);
		this.setControls(this.DEFAULT_CONTROLS); // Sets default control mode
		this.renderer.initialiseVisualisation();
	};

	ZincScene.prototype.setBackgroundColor = function(color,alpha){
		if (typeof this.renderer !== "undefined"){
			this.renderer.threejsRenderer.setClearColor(color,alpha);
		}
	}

	ZincScene.prototype.DEFAULT_CONTROLS = { DEFAULT_CAMERA: true,
											 DEFAULT_OBJECT: false };

	ZincScene.prototype._controls = null;

	/*
	  setControls configures which UI controls to enable.
	  Expects an object which map control IDs to a boolean value of whether to enable them.
	  There are currently two recognised IDs: DEFAULT_CAMERA and DEFAULT_OBJECT.
	  DEFAULT_CAMERA corresponds to the Camera controls in zinc_3js_renderer.
	  DEFAULT_OBJECT corresponds to the object controls/TransformControls.
	  TODO Currently, this function should be called before .startLoading(). In the future
	  it should be callable whenever is necessary.
	*/

	ZincScene.prototype.setControls = function(controls){
		this._controls = mergeOptionWithDefaults({DEFAULT_CAMERA:false,DEFAULT_OBJECT:false},controls);
		return this;
	}

	ZincScene.prototype.startLoading = function(){
		if (typeof this.renderer !== "undefined"){
			var renderer = this.renderer;
			var shouldEnableObjectControls = this._controls.DEFAULT_OBJECT;
			var shouldEnableCameraControls = this._controls.DEFAULT_CAMERA;
			var configObjectControlsFn = function(geom){
				if (shouldEnableObjectControls){
					renderer.zincObjectControls.attachMesh(geom.morph);
					renderer.zincObjectControls.enable();
					renderer.zincObjectControls.control.setMode( "rotate" );
					renderer.zincObjectControls.showControl();
				}
			}
			if (!shouldEnableCameraControls){
				renderer.zincCameraControls.disable();
			} else {
				renderer.zincCameraControls.enable();
			}
			renderer.loadFromViewURL(this.modelNs,configObjectControlsFn,this._onModelProgress.bind(this));
			renderer.animate();
		}
	};

	ZincScene.prototype.getSceneElement = function(){
		if (typeof this.renderer !== "undefined"){
			return this.renderer.threejsRenderer.domElement;
		} else {
			return null;
		}
	};

	ZincScene.prototype.setDefaultColour = function(colour){
		if (typeof this.renderer !== "undefined"){
			this.renderer.defaultColour = colour;
			return this;
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

	ZincScene.prototype._buildLoadingIndicator = function(totalFiles){
		var loadingIndicator = document.createElement('div');
		loadingIndicator.setAttribute('class',this._loadingClassName);
		loadingIndicator.innerHTML = "<p>Loading...</p>";
		return loadingIndicator;
	}

	ZincScene.prototype._makeResetButton = function(){
		var resetIcon = document.createElement('span');
		var resetText = document.createElement('span');
		var resetButton = document.createElement('a');
		resetButton.setAttribute('class','reset');
		resetIcon.setAttribute('class',"glyphicon glyphicon-repeat icon");
		resetIcon.setAttribute('aria-hidden','true');
		resetText.innerHTML = "Reset";
		resetButton.appendChild(resetIcon);
		resetButton.appendChild(resetText);
		var self = this;
		resetButton.addEventListener('click',function(){
			self.renderer.resetView();
		});
		return resetButton;
	}

	/*
	  _setupGrabCursors - sets up listeners for setting appropriate classes for
	  showing grab/hand cursors depending on mouse events.
	*/
	ZincScene.prototype._setupGrabCursors = function(root){
		this.getSceneElement().classList.add('grabbable');
		var self = this;
		var grabbableElement = root.getElementsByClassName('grabbable').item(0),
			_startGrabbing = function(){
				grabbableElement.classList.remove('grabbable');
				grabbableElement.classList.add('grabbing');
			},
			_endGrabbing = function(){
				grabbableElement.classList.remove('grabbing');
				grabbableElement.classList.add('grabbable');
			};
		grabbableElement.addEventListener('mousedown',_startGrabbing);
		grabbableElement.addEventListener('mouseup',_endGrabbing);
	}


	ZincScene.prototype._showScene = function(){
		$(this.root).find('.'+this._placeholderClassName).fadeOut();
		$(this.root).find('.'+this._loadingClassName).fadeOut();
		$(this.root).find('canvas').fadeIn();
		$(this.root).find('.reset').fadeIn();
		this._setupGrabCursors(this.root);
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

}());
