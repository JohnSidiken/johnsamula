const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
toggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        toggleButton.innerHTML = '☀️';
    } else {
        toggleButton.innerHTML = '🌙';
    }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
const hiddenElements = document.querySelectorAll('.section');
hiddenElements.forEach(el => observer.observe(el));
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    status.textContent = 'Sending...';
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        status.textContent = 'Thanks! Message sent. I\'ll reply soon.';
        form.reset();
      } else {
        status.textContent = 'Error. Please email johnsidiken@gmail.com directly.';
      }
    } catch (error) {
      status.textContent = 'Error. Check connection.';
    }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();