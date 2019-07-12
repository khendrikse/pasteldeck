const slides = document.getElementsByTagName('section');

function navigateSection(e) {
  const currentLocation = parseInt(window.location.hash.slice(1));
  const direction = checkKeyCode(e);

  if (direction === 'previous') {
    if (currentLocation === 0) return;
    return window.location.hash = currentLocation - 1;
  }

  if (currentLocation === slides.length - 1) return;
  return window.location.hash = currentLocation + 1;
}

function checkKeyCode(e) {
  if (e.keyCode === 37 || e.keyCode === 38) return 'previous';
  if (e.keyCode === 39 || e.keyCode === 40) return 'next';
}

document.addEventListener('keydown', navigateSection);
window.location.hash = 0;
