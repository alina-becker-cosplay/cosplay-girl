function toggleMenu() {
  const menu = document.getElementById('menuLinks');
  menu.classList.toggle('open');
}

// Global Variables
let currentPage = 1;
const cardsPerPage = 14;
let filteredCards = [];

// Show cards by page
function showPage(page) {
  const cards = filteredCards.length ? filteredCards : Array.from(document.querySelectorAll('.card'));
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;

  currentPage = page;

  cards.forEach((card, index) => {
    const start = (currentPage - 1) * cardsPerPage;
    const end = currentPage * cardsPerPage;
    card.style.display = index >= start && index < end ? 'block' : 'none';
  });

  updatePageNumbers(totalPages);
}

// Update pagination buttons
function updatePageNumbers(total) {
  const container = document.getElementById('pageNumbers');
  if (!container) return;

  container.innerHTML = '';

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => showPage(i);
    if (i === currentPage) btn.style.background = '#77c8ff';
    container.appendChild(btn);
  }
}

// Pagination navigation
function nextPage() {
  showPage(currentPage + 1);
}

function prevPage() {
  showPage(currentPage - 1);
}

// Search Functionality
const searchInput = document.querySelector('.search-container input');
searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const cards = Array.from(document.querySelectorAll('.card'));

  // Filter cards
  filteredCards = cards.filter(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('.content p').textContent.toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  // Hide all cards first
  cards.forEach(card => (card.style.display = 'none'));

  // Reset to page 1 for new search
  currentPage = 1;
  showPage(currentPage);
});

// Initialize
window.onload = () => showPage(1);
