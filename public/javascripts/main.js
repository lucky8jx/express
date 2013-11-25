(function($) {
	$('#logInForm').hide();
	$('.logIn').on("click", function(e) {
		e.preventDefault();
		$('#logInForm').slideToggle(500);
	});
})(jQuery);