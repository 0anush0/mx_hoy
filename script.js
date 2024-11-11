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

    // ... (keep the existing email form and search/filter event listeners) ...
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
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} - ${event.location}</p>
            <p>${event.description}</p>
            <div class="event-tags">
                ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
            </div>
        `;
        eventList.appendChild(eventElement);
    });
}

function loadPlaces() {
    const placesContainer = document.getElementById('places-list');
    placesContainer.innerHTML = '';
    for (const [category, venues] of Object.entries(places)) {
        venues.forEach(venue => {
            const venueElement = document.createElement('div');
            venueElement.classList.add('place');
            venueElement.innerHTML = `
                <h3>${venue.name}</h3>
                <p>Tipo: ${venue.type}</p>
                <p>Colonia: ${venue.neighborhood}</p>
                <p>Dirección: ${venue.address}</p>
                <a href="${venue.link}" target="_blank">Sitio Web</a>
                ${venue.teams ? `<p>Equipos: ${venue.teams.join(', ')}</p>` : ''}
            `;
            placesContainer.appendChild(venueElement);
        });
    }
}

function loadCategories() {
    const eventCategories = ['Conciertos', 'Cine', 'Teatro', 'Deportes', 'Exposiciones', 'Charlas', 'Clases', 'Tours'];
    const placeCategories = ['Movie Theaters', 'Concert Venues', 'Museums', 'Sports Arenas', 'Theaters', 'Cultural Centers'];

    populateCategories('event-category', eventCategories);
    populateCategories('places-category', placeCategories);
}

function populateCategories(selectId, categories) {
    const categorySelect = document.getElementById(selectId);
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// ... (keep the existing filterEvents, loadWeather, and submitEmail functions) ...

function filterPlaces() {
    const searchTerm = document.getElementById('places-search').value.toLowerCase();
    const category = document.getElementById('places-category').value.toLowerCase();
    const placeElements = document.querySelectorAll('.place');

    placeElements.forEach(place => {
        const placeName = place.querySelector('h3').textContent.toLowerCase();
        const placeType = place.querySelector('p').textContent.toLowerCase();
        const matchesSearch = placeName.includes(searchTerm);
        const matchesCategory = category === '' || placeType.includes(category);

        if (matchesSearch && matchesCategory) {
            place.style.display = 'block';
        } else {
            place.style.display = 'none';
        }
    });
}

// Add event listeners for place filtering
document.getElementById('places-search').addEventListener('input', filterPlaces);
document.getElementById('places-category').addEventListener('change', filterPlaces);
