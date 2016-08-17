$(function() {
	// shim for browsers that don't respect the html5 required attribute
	// *cough* safari *cough*
	$('form').each(function() {
		var thisForm = $(this);

		thisForm.submit(function(e) {

			var ref = thisForm.find("[required]");

			$(ref).each(function() {
				if ($(this).val() === '') {

					$(this).focus();

					e.preventDefault();

					thisForm.trigger("validationError", "Required field cannot be blank");

					return false;
				}
			});
			return true;
		});
	});


	$('#ob-feedback-toggle').click(function() {
		$('#ob-feedback-form-container').toggleClass('closed open');
	});

});