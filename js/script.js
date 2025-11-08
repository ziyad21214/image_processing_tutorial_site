// Toggle hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Load code snippets from external files
    const codeBlocks = document.querySelectorAll('code[data-src]');
    
    codeBlocks.forEach(codeBlock => {
        const src = codeBlock.getAttribute('data-src');
        fetch(src)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${src}`);
                return response.text();
            })
            .then(code => {
                codeBlock.textContent = code;
                Prism.highlightElement(codeBlock); // Re-highlight after loading
            })
            .catch(err => {
                console.error(err);
                codeBlock.textContent = 'Error loading code snippet.';
            });
    });
});

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.previousElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    navigator.clipboard.writeText(text).then(() => {
        button.textContent = 'تم النسخ!'; // Keep English for simplicity, or translate to 'تم النسخ!'
        setTimeout(() => {
            button.textContent = 'نسخ الكود';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}