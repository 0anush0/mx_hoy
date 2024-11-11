document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    loadPlaces();
    setupNavigation();
    setupFilters();
});

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

function setupFilters() {
    document.getElementById('event-search').addEventListener('input', filterEvents);
    document.getElementById('event-category').addEventListener('change', filterEvents);
    document.getElementById('places-search').addEventListener('input', filterPlaces);
    document.getElementById('places-category').addEventListener('change', filterPlaces);
}

async function loadEvents() {
    try {
        const response = await fetch('events.json');
        const events = await response.json();
        displayEvents(events);
        populateEventCategories(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

async function loadPlaces() {
    try {
        const response = await fetch('places.json');
        const places = await response.json();
        displayPlaces(places);
        populatePlaceCategories(places);
    } catch (error) {
        console.error('Error loading places:', error);
    }
}

function displayEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        const icon = getCategoryIcon(event.category);
        eventElement.innerHTML = `
            <i class="${icon} category-icon"></i>
            <h3>${event.name}</h3>
            <p class="event-date">${formatDate(event.date)}</p>
            <p class="event-location">${event.location}</p>
            <p class="event-description">${event.description}</p>
            <div class="event-tags">
                ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
            </div>
        `;
        eventList.appendChild(eventElement);
    });
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';

    places.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.classList.add('place');

        const icon = getCategoryIcon(place.category);
        placeElement.innerHTML = `
            <i class="${icon} category-icon"></i>
            <h3>${place.name}</h3>
            <p class="place-category">${place.category}</p>
            <p class="place-location">${place.location}</p>
            <p class="place-description">${place.description}</p>
        `;
        placesList.appendChild(placeElement);
    });
}

function getCategoryIcon(category) {
    const icons = {
        'música': 'fas fa-music',
        'teatro': 'fas fa-theater-masks',
        'cine': 'fas fa-film',
        'deportes': 'fas fa-football-ball',
        'arte': 'fas fa-palette',
        'museo': 'fas fa-landmark',
        'parque': 'fas fa-tree',
        'restaurante': 'fas fa-utensils',
        'bar': 'fas fa-glass-martini-alt',
        'concierto': 'fas fa-guitar'
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

function populateEventCategories(events) {
    const categories = [...new Set(events.map(event => event.category))];
    const select = document.getElementById('event-category');
    select.innerHTML = '<option value="">Todas las categorías</option>';
    categories.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function populatePlaceCategories(places) {
    const categories = [...new Set(places.map(place => place.category))];
    const select = document.getElementById('places-category');
    select.innerHTML = '<option value="">Todas las categorías</option>';
    categories.forEach(category => {
        select.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

function filterEvents() {
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const selectedCategory = document.getElementById('event-category').value.toLowerCase();

    document.querySelectorAll('.event').forEach(event => {
        const name = event.querySelector('h3').textContent.toLowerCase();
        const category = event.querySelector('.event-tag').textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !selectedCategory || category === selectedCategory;

        event.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}

function filterPlaces() {
    const searchTerm = document.getElementById('places-search').value.toLowerCase();
    const selectedCategory = document.getElementById('places-category').value.toLowerCase();

    document.querySelectorAll('.place').forEach(place => {
        const name = place.querySelector('h3').textContent.toLowerCase();
        const category = place.querySelector('.place-category').textContent.toLowerCase();

        const matchesSearch = name.includes(searchTerm);
        const matchesCategory = !selectedCategory || category === selectedCategory;

        place.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}
