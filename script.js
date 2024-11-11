document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    loadData();
});

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tab;

            // Update active tab button
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            // Update filters for current tab
            updateFilters(targetId);
        });
    });
}

function updateFilters(tabId) {
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');

    // Clear existing filters
    categorySelect.innerHTML = '<option value="">Todas las categorías</option>';
    searchInput.value = '';

    // Set appropriate categories based on active tab
    const categories = tabId === 'events' ? eventCategories : placeCategories;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

const eventCategories = [
    'Música', 'Teatro', 'Cine', 'Deportes', 'Arte',
    'Gastronomía', 'Literatura', 'Tecnología'
];

const placeCategories = [
    'Teatro', 'Museo', 'Estadio', 'Parque',
    'Centro Cultural', 'Sala de Conciertos'
];

function loadData() {
    // Load events
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            renderEvents(data.events);
            addEventListeners('events');
        })
        .catch(error => console.error('Error loading events:', error));

    // Load places
    fetch('places.json')
        .then(response => response.json())
        .then(data => {
            renderPlaces(data.places);
            addEventListeners('places');
        })
        .catch(error => console.error('Error loading places:', error));
}

function renderEvents(events) {
    const grid = document.getElementById('events-grid');
    grid.innerHTML = events.map(event => `
        <div class="card" data-categories="${event.tags.join(',')}">
            <i class="${getCategoryIcon(event.tags[0])} card-icon"></i>
            <h3 class="card-title">${event.name}</h3>
            <p class="card-date">${formatDate(event.date)}</p>
            <p class="card-location">${event.location}</p>
            <p>${event.description}</p>
            <div class="tags">
                ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderPlaces(places) {
    const grid = document.getElementById('places-grid');
    grid.innerHTML = places.map(place => `
        <div class="card" data-category="${place.category}">
            <i class="${getCategoryIcon(place.category)} card-icon"></i>
            <h3 class="card-title">${place.name}</h3>
            <p class="card-location">${place.location}</p>
            <p>${place.description}</p>
            <div class="tags">
                <span class="tag">${place.category}</span>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'música': 'fas fa-music',
        'teatro': 'fas fa-theater-masks',
        'cine': 'fas fa-film',
        'deportes': 'fas fa-futbol',
        'arte': 'fas fa-palette',
        'museo': 'fas fa-landmark',
        'estadio': 'fas fa-stadium',
        'parque': 'fas fa-tree',
        'centro cultural': 'fas fa-building',
        'sala de conciertos': 'fas fa-guitar',
        'gastronomía': 'fas fa-utensils',
        'literatura': 'fas fa-book',
        'tecnología': 'fas fa-laptop-code'
    };
    return icons[category.toLowerCase()] || 'fas fa-star';
}

function formatDate(dateString) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}

function addEventListeners(type) {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');

    const filterItems = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();
        const items = document.querySelectorAll(`#${type}-grid .card`);

        items.forEach(item => {
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const categories = item.dataset.categories?.toLowerCase() ||
                             item.dataset.category?.toLowerCase();

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = !selectedCategory || categories.includes(selectedCategory);

            item.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    };

    searchInput.addEventListener('input', filterItems);
    categorySelect.addEventListener('change', filterItems);
}
