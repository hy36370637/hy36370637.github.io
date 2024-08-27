document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.outline-3 > h3');
    const body = document.body;
    const tableOfContents = document.getElementById('table-of-contents');

    // Add menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menu-toggle';
    menuToggle.textContent = '☰';
    body.insertBefore(menuToggle, body.firstChild);

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('menu-open');
    });

    headers.forEach(header => {
        const toggleBtn = document.createElement('span');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = '[+]';
        header.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.textContent = this.textContent === '[+]' ? '[-]' : '[+]';
            let nextSibling = header.nextElementSibling;
            while (nextSibling && !nextSibling.matches('h3, h4, h5')) {
                nextSibling.style.display = this.textContent === '[-]' ? 'block' : 'none';
                nextSibling = nextSibling.nextElementSibling;
            }
        });
    });

    // Handle link clicks in the table of contents
    tableOfContents.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.stopPropagation();
            if (window.innerWidth <= 768) {
                body.classList.remove('menu-open');
            }
        }
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = tableOfContents.contains(event.target);
        const isClickOnMenuToggle = event.target.id === 'menu-toggle';
        
        if (!isClickInsideMenu && !isClickOnMenuToggle && body.classList.contains('menu-open')) {
            body.classList.remove('menu-open');
        }
    });
});
