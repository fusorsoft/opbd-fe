
$(function() {
	if ( $('#loginFlyout div.errorMessage:first').text().trim().length > 0) {
		$('#loginFlyout').toggle(500, 'linear');
	}

	$('#loginFlyoutToggle').click(function() {
		$('#loginFlyout').toggle(500, 'linear');
	});

	$('#loginForm').on('validationError', function(event, message) {
		$(this).parent().find('.errorMessage:first').text(message);
	});
});