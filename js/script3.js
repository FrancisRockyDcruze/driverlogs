const app = document.getElementById('app');
const links = document.querySelectorAll('[data-page]');
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function initFeedbackCarousel() {
  const container = document.getElementById('cardsContainer');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');

  if (!container || container.children.length < 1) return;

  const cards = Array.from(container.children);
  const visibleCards = 3;
  const gap = 24;
  const cardWidth = cards[0].offsetWidth + gap;

  // Clone last & first cards
  const firstClones = cards.slice(0, visibleCards).map(c => c.cloneNode(true));
  const lastClones = cards.slice(-visibleCards).map(c => c.cloneNode(true));

  lastClones.forEach(clone => container.prepend(clone));
  firstClones.forEach(clone => container.append(clone));

  let index = visibleCards;
  container.scrollLeft = cardWidth * index;

  function moveToIndex(i, smooth = true) {
    container.style.scrollBehavior = smooth ? 'smooth' : 'auto';
    container.scrollLeft = cardWidth * i;
  }

  nextBtn.onclick = () => {
    index++;
    moveToIndex(index);

    if (index === cards.length + visibleCards) {
      setTimeout(() => {
        index = visibleCards;
        moveToIndex(index, false);
      }, 300);
    }
  };

  prevBtn.onclick = () => {
    index--;
    moveToIndex(index);

    if (index === 0) {
      setTimeout(() => {
        index = cards.length;
        moveToIndex(index, false);
      }, 300);
    }
  };
}

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

    if (page === 'home') {
    initFeedbackCarousel(); // ✅ bind events now
  }

  } catch {
    app.innerHTML = '<p class="p-6">Page not found</p>';
  }

  // close mobile menu after click
  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('block');
  }

  // Update underline whenever a page loads
  updateActiveLink(page);
}

// Handle nav link clicks
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;

    // Update URL hash without reload
    window.location.hash = page;

    // Load page (underline will update inside loadPage)
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

// Handle back/forward navigation
window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', '') || 'home';
  loadPage(page, false);
});
