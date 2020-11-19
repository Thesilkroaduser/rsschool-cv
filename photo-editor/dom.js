function filtersUpdate(e) {
  if (e.target.type == 'range') {
    let filter = e.target;
    const suffix = filter.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${filter.name}`, filter.value + suffix);
  }
};

window.addEventListener('change', filtersUpdate);
window.addEventListener('mousemove', filtersUpdate);