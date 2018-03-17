function toggleUserActionsClass () {
  const elem = document.getElementById('userActionsMenu')
  elem.classList.toggle('ob-fadeOut')
  elem.classList.toggle('ob-fadeIn')
}

document.addEventListener('DOMContentLoaded', function (event) {
  var toggleElement = document.getElementById('userActionsToggle')

  if (toggleElement) {
    toggleElement.addEventListener('click', toggleUserActionsClass, false)
  }
})
