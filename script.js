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
        placeElement.innerHTML = `
            <h3><i class="${getCategoryIcon(place.type)}"></i> ${place.name}</h3>
            <p>Tipo: ${place.type}</p>
            <p>Colonia: ${place.neighborhood}</p>
            <p>Dirección: ${place.address}</p>
            <a href="${place.link}" target="_blank">Sitio Web</a>
            ${place.teams ? `<p>Equipos: ${place.teams.join(', ')}</p>` : ''}
        `;
        placesList.appendChild(placeElement);
    });
}

function getCategoryIcon(category) {
    const icons = {
        'Concert Venue': 'fas fa-music',
        'Movie Theater': 'fas fa-film',
        'Theater': 'fas fa-theater-masks',
        'Sports Venue': 'fas fa-futbol',
        'Museum': 'fas fa-landmark',
        'Park': 'fas fa-tree',
        'Cultural Center': 'fas fa-palette'
    };
    return icons[category] || 'fas fa-map-marker-alt';
}

function loadCategories() {
    const eventCategories = ['Conciertos', 'Cine', 'Teatro', 'Deportes', 'Exposiciones', 'Charlas', 'Clases', 'Tours'];
    const placeCategories = ['Concert Venue', 'Movie Theater', 'Theater', 'Sports Venue', 'Museum', 'Park', 'Cultural Center'];

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

function filterEvents() {
    const searchTerm = document.getElementById('event-search').value.toLowerCase();
    const category = document.getElementById('event-category').value.toLowerCase();
    const events = document.querySelectorAll('.event');

    events.forEach(event => {
        const eventName = event.querySelector('h3').textContent.toLowerCase();
        const eventTags = Array.from(event.querySelectorAll('.event-tag')).map(tag => tag.textContent.toLowerCase());
        const matchesSearch = eventName.includes(searchTerm);
        const matchesCategory = category === '' || eventTags.includes(category);

        if (matchesSearch && matchesCategory) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}

function filterPlaces() {
    const searchTerm = document.getElementById('places-search').value.toLowerCase();
    const category = document.getElementById('places-category').value.toLowerCase();
    const places = document.querySelectorAll('.place');

    places.forEach(place => {
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

async function loadWeather() {
    // This is a placeholder. In a real application, you would fetch weather data from an API
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = '<p>CDMX: 22°C, Parcialmente nublado</p>';
}

async function submitEmail(email) {
    // This is a placeholder. In a real application, you would send this data to your server
    console.log(`Email submitted: ${email}`);
    alert('¡Gracias por registrarte! Estarás participando en nuestros próximos sorteos.');
}
