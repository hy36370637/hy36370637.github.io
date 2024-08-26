document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.outline-3 > h3');

    headers.forEach(header => {
        const toggleBtn = document.createElement('span');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = '[+]';
        header.appendChild(toggleBtn);  // 헤더의 끝에 버튼 추가

        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = this.textContent === '[+]' ? '[-]' : '[+]';
            let nextSibling = header.nextElementSibling;
            while (nextSibling && !nextSibling.matches('h3, h4, h5')) {
                nextSibling.style.display = this.textContent === '[-]' ? 'block' : 'none';
                nextSibling = nextSibling.nextElementSibling;
            }
        });
    });
});
