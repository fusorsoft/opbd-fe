function toggleFeedbackClass() {
	var elem = document.getElementById('ob-feedback-form-container');
	elem.classList.toggle('closed');
	elem.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function(event) {

	var feedbackToggleElement = document.getElementById('ob-feedback-toggle');
	var navigationToggleElement = document.getElementById('ob-global-nav-toggle');

	if (feedbackToggleElement) {
		feedbackToggleElement.addEventListener('click', toggleFeedbackClass, false);
	}

	if (navigationToggleElement) {
		navigationToggleElement.addEventListener('click', toggleHamburgerNav, false);
	}
});

function toggleHamburgerNav() {
	var elem = document.getElementById('globalNavigation');
	//elem.classList.toggle('visible');
	elem.classList.toggle('ob-fadeOut');
	elem.classList.toggle('ob-fadeIn');
}