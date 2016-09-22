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

	if (window.matchMedia) {
		var handleMediaMatch = function(mql) {
			if (mql.matches) {
				var navigationToggleElement = document.getElementById('globalNavigation');
				navigationToggleElement.classList.add('ob-fadeOut');
			}
		};

		var mql = window.matchMedia('only screen and (min-device-width : 320px) and (max-device-width : 480px)');
		handleMediaMatch(mql);
	}
});


function toggleHamburgerNav() {
	var elem = document.getElementById('globalNavigation');
	//elem.classList.toggle('visible');
	elem.classList.toggle('ob-fadeOut');
	elem.classList.toggle('ob-fadeIn');
}