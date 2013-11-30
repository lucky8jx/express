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

	APP.namespace('signUp.validateUsername');
	APP.signUp.validateUsername = (function() {
		var usernameSignUp = $('#usernameSignUp');
		// init function
		function init() {
			usernameSignUp.on('blur', function() {
				var inputUsername = usernameSignUp.val();
				if (isInLengthRange(inputUsername)) {
					isExist(inputUsername);
				}
			});
		}
		// validate the length of user name
		function isInLengthRange(inputUsername) {
			var max = inputUsername.length;
			if (max < 3 || max > 16) {
				usernameSignUp.removeClass()
					.addClass('userUnavailable')
					.prev('label').removeClass()
						.addClass('userUnavailable');
				return false;
			} else {
				usernameSignUp.removeClass()
					.prev('label').removeClass();
				return true;
			}
		}
		// validate the Existance of user name
		function isExist(inputUsername) {
			$.post('/validateUsername', {username: inputUsername}, function(data) {
				if (data === "userExist") {
					usernameSignUp.addClass(data)
						.prev('label').addClass(data);
				} else if (data === "userAvailable") {
					usernameSignUp.addClass(data);
				}
			});
		}
		return {
			init: init
		};
	})();
	APP.logIn.init({
		effect: 'fadeToggle',
		speed: 500
	});
	APP.signUp.validateUsername.init();
})(jQuery);