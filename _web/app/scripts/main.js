"use strict";
(function(){
	window.inpageScrollLink = function(linkSel,linkToSel){
		$(linkSel).click(function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $(linkToSel).offset().top - 150
		}, 500);
		});
	}

	window.FrontPageBanner = function(container){
		this.messageElement = container.getElementsByClassName('message')[0];
		this.modelDescElement = document.getElementsByClassName('modelDesc')[0];
		this.renderer = renderer;
		this.heartModelElement = renderer.domElement;

		this._setupGrabCursors = function(){
			var self = this;
			this.heartModelElement.classList.add('grabbable');
			var listen = this.heartModelElement.addEventListener,
				_startGrabbing = function(){
					if (self.messageElement.classList.contains('active')) return;
					self.messageElement.classList.add('grabbing');
					self.heartModelElement.classList.remove('grabbable');
					self.heartModelElement.classList.add('grabbing');
					self.modelDescElement.classList.add('grabbing');
				},
				_endGrabbing = function(){
					self.messageElement.classList.remove('grabbing');
					self.modelDescElement.classList.remove('grabbing');
					self.heartModelElement.classList.remove('grabbing');
					self.heartModelElement.classList.add('grabbable');
				};
			listen('mousedown',_startGrabbing);
			listen('mouseup',_endGrabbing);
		}

		this._setupEventPassthrough = function(){
			var self = this;
			var messageListen = this.messageElement.addEventListener;
			var _markActive = function(event){
				if (event.target === self.heartModelElement) return;
				self.messageElement.classList.add('active');
			};
			var _unmarkActive = function(event){
				if (event.target === self.heartModelElement) return;
				self.messageElement.classList.remove('active');
			};
			messageListen('mousedown',_markActive);
			messageListen('touchstart',_markActive);
			messageListen('mouseup',_unmarkActive);
			messageListen('touchend',_unmarkActive);

			var _enablePassthrough = function(){
				if (self.messageElement.classList.contains('active')) return;
				self.messageElement.classList.add('passthrough');
				self.modelDescElement.classList.add('passthrough');
			};

			var _disablePassthrough = function(){
				self.messageElement.classList.remove('passthrough');
				self.modelDescElement.classList.remove('passthrough');
				self.messageElement.classList.remove('active')
			};
			var listen = this.heartModelElement.addEventListener;
			listen('mousedown',_enablePassthrough);
			listen('touchstart',_enablePassthrough);
			listen('mouseup',_disablePassthrough);
			listen('touchend',_disablePassthrough);

			document.body.addEventListener('mouseup',_disablePassthrough);
		}


		this._setupEventPassthrough();
		this._setupGrabCursors();

	};

}());
