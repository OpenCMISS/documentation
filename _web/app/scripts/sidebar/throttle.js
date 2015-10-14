/* jshint laxcomma:true, laxbreak: true, asi:true */
/* global define, module */
/* @preserve
 * MIT Licensed
 * Copyright (c) 2014, Priit Pirita, atirip@yahoo.com
 */
;(function() {

	// one of the goals was not to create garbage of any sort during throttling

	var	win = this
	var mname = 'throttle'

	// interval	- throttle firing interval
	// fn 		- callback to be called, max arguments on throttle callback is 3 ( safe bet, to get rid of arguments garbage, add more if needed )
	// 			  on most cases only one is enough as when acting as event handler ( scroll, resize, keyup )
	//			  throttle phase is passed on as 4th parameter - 1 as first, 2 as throttling, 3 as last
	//
	// context 	- callbcak calling context, if needed
	// first 	- whether to call callback at first throtle call, default false
	// after 	- whether to call callback only after last call to throttle

	var	throttle = function (interval, fn, context, first, after) {
		context || (context = win)

		var	Throttle = function () {
			this.lastTime = 0
			this.timer = 0
			this.after = this.after.bind(this)
			this.run = this.run.bind(this)
			// <=IE9 does not support setTimeout arguments
			// hardcoded max 3 arguments
			this.a1
			this.a2
			this.a3
		}

		Throttle.prototype = {

			after: function () {
				fn.call(context, this.a1, this.a2, this.a3, 3)
				this.lastTime = 0
				this.timer = 0
			}

		,	run: function() {
				var now = +new Date
				var phase = (first && !this.lastTime) ? 1 : ( (now - this.lastTime > interval) ? 2 : 0 )
				if ( phase ) {
					if ( !after ) {
						fn.call(context, this.a1, this.a2, this.a3, phase)
						this.lastTime = now
					}
					this.timer && clearTimeout(this.timer)
					// have a little "breathing room", if the after one's interval is too close to interval we have possibility to launcing it prematurely
					this.timer = setTimeout(this.after, interval * 1.25)
				}
			}

		,	throttle: function(a1, a2, a3) {
				this.a1 = a1
				this.a2 = a2
				this.a3 = a3
				setTimeout(this.run, 0)
			}
		}
		var T = new Throttle()
		return T.throttle.bind(T)
	}

	if (typeof define === 'function' && define.amd) {
		define(throttle)
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = throttle
	} else {
		this[mname] = throttle
	}

}).call(this);