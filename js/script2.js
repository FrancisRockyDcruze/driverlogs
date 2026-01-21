const app = document.getElementById('app');
const links = document.querySelectorAll('[data-page]');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Function to update underline
function updateActiveLink(page) {
  links.forEach(link => {
    if (link.dataset.page === page) {
      link.classList.add('after:w-full'); // show underline
    } else {
      link.classList.remove('after:w-full'); // hide underline
    }
  });
}

async function loadPage(page, push = true) {
try {
    const res = await fetch(`${page}.html`);
    const html = await res.text();
    app.innerHTML = html;

    if (push) {
      history.pushState(null, '', page === 'home' ? '/' : `#${page}`);
    }
    
} catch {
    app.innerHTML = '<p class="p-6">Page not found</p>';
}

// close mobile menu after click
  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('block');
  }
}

links.forEach(link => {
link.addEventListener('click', e => {
    e.preventDefault();
    // Update URL hash without reloading
    const page = link.dataset.page;
    window.location.hash = page;

    // Update underline
    setActiveLink();

    loadPage(page);
});
});

menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('block');
    });

// Initial load
const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage, false);
setActiveLink();

// Handle back/forward buttons
window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', '') || 'home';
  loadPage(page, false);
});