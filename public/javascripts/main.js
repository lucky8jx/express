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

	APP.namespace('signUp.validate');
	APP.signUp.validate = (function() {
		var usernameSignUp = $('#usernameSignUp'),
			emailSignUp = $('#emailSignUp'),
			passSignUp = $('#passwordSignUp'),
			cmPassSignUp = $('#cmPasswordSignUp'),
			button = $('#buttonSignUp');
		var flag = true;
		// init function
		function init() {		
			usernameSignUp.on('blur', function() {
				var inputUsername = usernameSignUp.val();
				validateUsername(inputUsername, isTokenUsername);
			});
			emailSignUp.on('blur', function() {
				var inputEmail = emailSignUp.val();
				validateEmail(inputEmail, isTokenEmail);
			});
			passSignUp.on('blur', function() {
				var inputPass = passSignUp.val();
				validatePass(inputPass);
			});
			cmPassSignUp.on('blur', function() {
				var inputCmPass = cmPassSignUp.val(),
					inputPass = passSignUp.val();
				validateCmPass(inputPass, inputCmPass);
			});			
		}
		// false or true
		// validate the length of user name
		function validateUsername(inputUsername, cb) {
			var pattern = /^[0-9A-Za-z!@#\$%]{3,16}$/;
			if (!pattern.test(inputUsername)) {
				usernameSignUp.removeClass()
					.addClass('unAvailable')
					.prev('label').removeClass();
			} else {
				usernameSignUp.removeClass()
					.prev('label').removeClass();
				cb(inputUsername, isToken);
			}
		}
		// validate the Existance of user name
		function isTokenUsername(inputUsername, cb) {
			$.post('/validateUsername', {username: inputUsername}, function(data) {
				cb(data, usernameSignUp);
			});
		}
		// email
		function validateEmail(inputEmail, cb) {
			var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (pattern.test(inputEmail)) {
				emailSignUp.removeClass()
					.prev('label').removeClass();
				cb(inputEmail, isToken);
			} else {
				emailSignUp.removeClass()
					.addClass('unAvailable')
					.prev('label').removeClass();
			}
		}
		// email is token
		function isTokenEmail(inputEmail, cb) {
			$.post('/validateEmail', {email: inputEmail}, function(data) {
				cb(data, emailSignUp);
			});
		}
		// is token
		function isToken(data, obj) {
			if (data === "token") {
				obj.addClass(data)
					.prev('label').addClass(data);
			} else if (data === "available") {
				obj.addClass(data);
			}
		}
		// validate password
		function validatePass(inputPass) {
			var pattern = /^[0-9A-Za-z]{6,12}$/;
			if (pattern.test(inputPass)) {
				passSignUp.removeClass()
					.addClass('available');
			} else {
				passSignUp.removeClass()
					.addClass('unAvailable');
			}
		}
		function validateCmPass(pass, cmPass) {
			// console.log(cmPass);
			if( pass === cmPass && cmPass !== '') {
				cmPassSignUp.removeClass()
					.addClass('available');
			} else {
				cmPassSignUp.removeClass()
					.addClass('unAvailable');
			}
		}
		return {
			init: init
		};
	})();
	APP.logIn.init({
		effect: 'fadeToggle',
		speed: 500
	});
	APP.signUp.validate.init();
})(jQuery);