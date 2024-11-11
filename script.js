document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    loadPlaces();
    loadCategories();
    loadWeather();

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

    document.getElementById('email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        submitEmail(email);
    });

    document.getElementById('event-search').addEventListener('input', filterEvents);
    document.getElementById('event-category').addEventListener('change', filterEvents);
    document.getElementById('places-search').addEventListener('input', filterPlaces);
    document.getElementById('places-category').addEventListener('change', filterPlaces);
});

async function loadEvents() {
    try {
        const response = await fetch('events.json');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function displayEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        const icon = getCategoryIcon(event.tags[0]);
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

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

async function loadPlaces() {
    try {
        const response = await fetch('places.json');
        const places = await response.json();
        displayPlaces(places);
    } catch (error) {
        console.error('Error loading places:', error);
    }
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    placesList.innerHTML = '';

    places.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.classList.add('place');

        const icon = getCategoryIcon(place.type);
        placeElement.innerHTML = `
            <i class="${icon} category-icon"></i>
            <h3>${place.name}</h3>
            <p>Tipo: ${place.type}</p>
            <p>Colonia: ${place.neighborhood}</p>
            <p>Dirección: ${place.address}</p>
            ${place.website ? `<p>Sitio Web: ${place.website}</p>` : ''}
            ${place.teams ? `<p>Equipos: ${place.teams.join(', ')}</p>` : ''}
        `;
        placesList.appendChild(placeElement);
    });
}

function getCategoryIcon(category) {
    const icons = {
        'conciertos': 'fas fa-music',
        'rock': 'fas fa-guitar',
        'cine': 'fas fa-film',
        'festival': 'fas fa-star',
        'teatro': 'fas fa-theater-masks',
        'deportes': 'fas fa-basketball-ball',
        'fútbol': 'fas fa-futbol',
        'exposiciones': 'fas fa-palette',
        'arte': 'fas fa-paint-brush',
        'charlas': 'fas fa-microphone',
        'tecnología': 'fas fa-laptop-code',
        'ciencia': 'fas fa-atom',
        'gastronomía': 'fas fa-utensils',
        'literatura': 'fas fa-book',
        'Movie Theater': 'fas fa-film',
        'Concert Venue': 'fas fa-music',
        'Museum': 'fas fa-landmark',
        'Sports Arena': 'fas fa-futbol',
        'Theater': 'fas fa-theater-masks',
        'Cultural Center': 'fas fa-palette',
        'Park': 'fas fa-tree'
    };
    return icons[category.toLowerCase()] || 'fas fa-calendar-alt';
}

function loadCategories() {
    const eventCategories = [
        'Conciertos', 'Cine', 'Teatro', 'Deportes', 'Exposiciones',
        'Charlas', 'Clases', 'Tours', 'Música', 'Festival', 'Cultura',
        'Literatura', 'Fútbol', 'Arte', 'Tecnología', 'Ciencia',
        'Gastronomía', 'Historia', 'Jazz', 'Entretenimiento', 'Béisbol',
        'Música Electrónica', 'Parques', 'Naturaleza', 'Recreación',
        'Comedia', 'Clubes', 'Fiesta'
    ];

    const placeCategories = [
        'Movie Theater', 'Concert Venue', 'Museum', 'Sports Arena',
        'Theater', 'Cultural Center', 'Park'
    ];

    populateCategories('event-category', eventCategories);
    populateCategories('places-category', placeCategories);
}

function populateCategories(selectId, categories) {
    const categorySelect = document.getElementById(selectId);
    categorySelect.innerHTML = '<option value="">Todas las categorías</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function filterEvents() {
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const category = document.getElementById('event-category').value.toLowerCase();
    const events = document.querySelectorAll('.event');

    events.forEach(event => {
        const eventName = event.querySelector('h3').textContent.toLowerCase();
        const eventTags = Array.from(event.querySelectorAll('.event-tag'))
            .map(tag => tag.textContent.
