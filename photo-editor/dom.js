function editPhoto() {
    const filters = document.querySelectorAll('input');
    
    filters.forEach(filter => filter.addEventListener('change', filtersUpdate));
    filters.forEach(filter => filter.addEventListener('mousemove', filtersUpdate));
    function filtersUpdate() {
        const suffix = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    };
};

editPhoto();