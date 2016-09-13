function toggleFeedbackClass() {
	elem = document.getElementById('ob-feedback-form-container');
	elem.classList.toggle('closed');
	elem.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function(event) {

	var toggleElement = document.getElementById('ob-feedback-toggle');

	if (toggleElement) {
		toggleElement.addEventListener('click', toggleFeedbackClass, false);
	}
});

