const slides = document.getElementsByTagName('section');

function navigate(currentLocation, boundary, location) {
  if (currentLocation === boundary) return;
  return (window.location.hash = location);
}

function navigateSection(e) {
  const direction = checkKeyCode(e);
  const currentLocation = parseInt(window.location.hash.slice(1));

  if (direction === 'previous') {
    navigate(currentLocation, 0, currentLocation - 1);
  }

  if (direction === 'next') {
    navigate(currentLocation, slides.length - 1, currentLocation + 1);
  }
}

function checkKeyCode(e) {
  if (e.keyCode === 37 || e.keyCode === 38) return 'previous';
  if (e.keyCode === 39 || e.keyCode === 40) return 'next';
}

document.addEventListener('keydown', navigateSection);
