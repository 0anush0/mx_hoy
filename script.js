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
    const places = {
        'Venues': ['Foro Sol', 'Palacio de los Deportes', 'Auditorio Nacional', 'Teatro de la Ciudad'],
        'Museos': ['Museo Nacional de Antropología', 'Museo Soumaya', 'MUAC', 'Museo Frida Kahlo'],
        'Cines': ['Cineteca Nacional', 'Cine Tonalá', 'Cinépolis', 'Cinemex'],
        'Teatros': ['Teatro Metropólitan', 'Teatro de los Insurgentes', 'Teatro Hidalgo', 'Foro Shakespeare']
    };

    const placeGrid = document.querySelector('.place-grid');
    for (const [category, placeList] of Object.entries(places)) {
        const categoryElement = document.createElement('div');
        categoryElement.classList.add('place-category');
        categoryElement.innerHTML = `
            <h3>${category}</h3>
            <ul>
                ${placeList.map(place => `<li>${place}</li>`).join('')}
            </ul>
        `;
        placeGrid.appendChild(categoryElement);
    }
}

function loadCategories() {
    const categories = ['Conciertos', 'Cine', 'Teatro', 'Deportes', 'Exposiciones', 'Charlas', 'Clases', 'Tours'];
    const categorySelect = document.getElementById('event-category');
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

async function loadWeather() {
    // This is a placeholder. In a real application, you would fetch weather data from an API
    const weatherWidget = document.getElementById('weather-widget');
    weatherWidget.innerHTML = '<h3>Clima en CDMX</h3><p>22°C, Parcialmente nublado</p>';
}

async function submitEmail(email) {
    console.log(`Email submitted: ${email}`);
    alert('¡Gracias por suscribirte! Te mantendremos informado sobre los mejores eventos en CDMX.');
}
