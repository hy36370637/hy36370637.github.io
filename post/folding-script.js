document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.outline-3 > h3');
    const body = document.body;
    const tableOfContents = document.getElementById('table-of-contents');

    // Add menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.id = 'menu-toggle';
    menuToggle.textContent = '☰';
    body.insertBefore(menuToggle, body.firstChild);

    // Add dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.textContent = '🌓';
    body.insertBefore(darkModeToggle, body.firstChild);

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        body.classList.toggle('menu-open');
    });

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
    });

    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

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
