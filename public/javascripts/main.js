(function($) {
	// APP
	// Global Namespace Object
	var APP = APP || {};

	// General Purpose Namespace Function
	APP.namespace = function(ns_string) {
		var parts = ns_string.split('.'),
			parent = APP;

		// strip redundant leading global
		if (parts[0] === "APP") {
			parts = parts.slice(1);
		}

		for (var i = 0, max = parts.length; i < max; i += 1) {
			// create a property if it doesn't exist
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}
		return parent;
	};

	// Add a method() to the Function
	if (typeof Function.prototype.method !== "function") {
		Function.prototype.method = function (name, implementation) {
			this.prototype[name] = implementation;
			return this;
		};
	}

	// LogIn form
	APP.namespace('logIn');
	APP.logIn = (function() {
		var logInForm = $('#logInForm').hide(),
			config = {
				effect: 'slideToggle',
				speed: 300
			};

		// init function
		function init(conf) {
			$.extend(config, conf);
			$('.logIn').on('click', function(e) {
				e.preventDefault();
				show();
			});
		}
		// show 
		function show() {
			logInForm.stop()[config.effect](config.speed);
		}
		return {
			// private method(init) as public one
			init: init
		};
	}());
	APP.logIn.init({
		effect: 'fadeToggle',
		speed: 500
	});
})(jQuery);