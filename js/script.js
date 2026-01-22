<<<<<<< HEAD
  const app = document.getElementById('app');
  const links = document.querySelectorAll('[data-page]');

  async function loadPage(page, push = true) {
    if (page === 'home') {
      app.innerHTML = document.getElementById('home').innerHTML;
      if (push) history.pushState(null, '', '/');
      return;
    }

    try {
      const res = await fetch(`${page}.html`);
      const html = await res.text();
      app.innerHTML = html;
      if (push) history.pushState(null, '', `#${page}`);
    } catch (err) {
      app.innerHTML = '<p class="p-6">Page not found</p>';
    }
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      loadPage(link.dataset.page);
    });
  });

  window.addEventListener('popstate', () => {
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page, false);
  });

  loadPage(location.hash.replace('#', '') || 'home', false);
  
=======
  const app = document.getElementById('app');
  const links = document.querySelectorAll('[data-page]');

  async function loadPage(page, push = true) {
    if (page === 'home') {
      app.innerHTML = document.getElementById('home').innerHTML;
      if (push) history.pushState(null, '', '/');
      return;
    }

    try {
      const res = await fetch(`${page}.html`);
      const html = await res.text();
      app.innerHTML = html;
      if (push) history.pushState(null, '', `#${page}`);
    } catch (err) {
      app.innerHTML = '<p class="p-6">Page not found</p>';
    }
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      loadPage(link.dataset.page);
    });
  });

  window.addEventListener('popstate', () => {
    const page = location.hash.replace('#', '') || 'home';
    loadPage(page, false);
  });

  loadPage(location.hash.replace('#', '') || 'home', false);
  
>>>>>>> 2414d09a62b0ef3f192e544f2f34e5e947afbe18
