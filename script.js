document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    loadPlaces();
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

    // Get unique categories from places
    if (tabId === 'places') {
        fetch('places.json')
            .then(response => response.json())
            .then(data => {
                const categories = [...new Set(data.places.map(place => place.subcategories).flat())];
                categories.sort().forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.toLowerCase();
                    option.textContent = category;
                    categorySelect.appendChild(option);
                });
            });
    }
}

function loadPlaces() {
    fetch('places.json')
        .then(response => response.json())
        .then(data => {
            renderPlaces(data.places);
            setupFilters();
        })
        .catch(error => console.error('Error loading places:', error));
}

function renderPlaces(places) {
    const grid = document.getElementById('places-grid');
    grid.innerHTML = places.map(place => `
        <div class="place-card" data-categories="${place.subcategories.join(',').toLowerCase()}">
            <i class="${getCategoryIcon(place.subcategories[0])} category-icon"></i>
            <h3>${place.name}</h3>
            <p class="area">${place.area}</p>
            <div class="tags">
                ${place.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${place.website}" target="_blank" class="website-link">Visitar sitio web</a>
            <a href="${place.location}" target="_blank" class="location-link">Ver en mapa</a>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'Art': 'fas fa-palette',
        'History': 'fas fa-landmark',
        'Science': 'fas fa-microscope',
        'Anthropology': 'fas fa-users',
        'Archaeology': 'fas fa-dig',
        'Contemporary Art': 'fas fa-paint-brush',
        'Modern Art': 'fas fa-star',
        'Natural History': 'fas fa-leaf',
        'Technology': 'fas fa-laptop',
        'Interactive': 'fas fa-hands',
        'Religious': 'fas fa-church',
        'Military': 'fas fa-fighter-jet',
        'Transportation': 'fas fa-train',
        'Culture': 'fas fa-globe',
        'Design': 'fas fa-pencil-ruler'
    };
    return icons[category] || 'fas fa-museum';
}

function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');

    const filterPlaces = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();
        const places = document.querySelectorAll('.place-card');

        places.forEach(place => {
            const name = place.querySelector('h3').textContent.toLowerCase();
            const categories = place.dataset.categories.toLowerCase();

            const matchesSearch = name.includes(searchTerm);
            const matchesCategory = !selectedCategory || categories.includes(selectedCategory);

            place.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
        });
    };

    searchInput.addEventListener('input', filterPlaces);
    categorySelect.addEventListener('change', filterPlaces);
}
