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

const places = {
    "Movie Theaters": [
        { name: "Cineteca Nacional", type: "Movie Theater", neighborhood: "Coyoacán", address: "Av. México Coyoacán 389, Xoco, 03330", link: "https://www.cinetecanacional.net/" },
        { name: "Cine Tonalá", type: "Movie Theater", neighborhood: "Roma Sur", address: "Tonalá 261, Roma Sur, 06760", link: "https://www.cinetonala.mx/" },
        { name: "Cinépolis Diana", type: "Movie Theater", neighborhood: "Cuauhtémoc", address: "Paseo de la Reforma 423, Cuauhtémoc, 06500", link: "https://cinepolis.com/" },
        { name: "La Casa del Cine MX", type: "Movie Theater", neighborhood: "Centro Histórico", address: "República de Uruguay 52, Centro Histórico, 06000", link: "https://lacasadelcine.mx/" },
        { name: "Cinemanía Plaza Loreto", type: "Movie Theater", neighborhood: "Álvaro Obregón", address: "Altamirano 46, Tizapán, 01090", link: "https://www.cinemapark.com.mx/" }
    ],
    "Concert Venues": [
        { name: "Foro Sol", type: "Concert Venue", neighborhood: "Iztacalco", address: "Av. Viaducto Río de la Piedad, Granjas México, 08400", link: "https://www.ocesa.com.mx/venues/foro-sol/" },
        { name: "Palacio de los Deportes", type: "Concert Venue", neighborhood: "Iztacalco", address: "Av. Río Churubusco y Añil s/n, Granjas México, 08400", link: "https://www.palaciodelosdeportes.com.mx/" },
        { name: "Auditorio Nacional", type: "Concert Venue", neighborhood: "Miguel Hidalgo", address: "Av. Paseo de la Reforma 50, Bosque de Chapultepec, 11580", link: "https://www.auditorio.com.mx/" },
        { name: "Teatro Metropólitan", type: "Concert Venue", neighborhood: "Cuauhtémoc", address: "Independencia 90, Centro Histórico, 06050", link: "https://www.teatrometropolitan.com/" },
        { name: "El Plaza Condesa", type: "Concert Venue", neighborhood: "Cuauhtémoc", address: "Juan Escutia 4, Condesa, 06140", link: "https://plazacondesa.com.mx/" }
    ],
    "Museums": [
        { name: "Museo Nacional de Antropología", type: "Museum", neighborhood: "Miguel Hidalgo", address: "Av. Paseo de la Reforma & Calzada Gandhi, Chapultepec Polanco, 11560", link: "https://www.mna.inah.gob.mx/" },
        { name: "Museo Soumaya", type: "Museum", neighborhood: "Miguel Hidalgo", address: "Blvd. Miguel de Cervantes Saavedra 303, Granada, 11529", link: "https://www.museosoumaya.org/" },
        { name: "Museo Frida Kahlo", type: "Museum", neighborhood: "Coyoacán", address: "Londres 247, Del Carmen, 04100", link: "https://www.museofridakahlo.org.mx/" },
        { name: "Museo Universitario Arte Contemporáneo (MUAC)", type: "Museum", neighborhood: "Coyoacán", address: "Insurgentes Sur 3000, Centro Cultural Universitario, 04510", link: "https://muac.unam.mx/" },
        { name: "Museo Jumex", type: "Museum", neighborhood: "Miguel Hidalgo", address: "Miguel de Cervantes Saavedra 303, Granada, 11520", link: "https://www.fundacionjumex.org/" }
    ],
    "Sports Arenas": [
        { name: "Estadio Azteca", type: "Sports Arena", neighborhood: "Coyoacán", address: "Calzada de Tlalpan 3465, Santa Úrsula Coapa, 04650", link: "https://www.estadioazteca.com.mx/", teams: ["Club América", "Cruz Azul"] },
        { name: "Estadio Olímpico Universitario", type: "Sports Arena", neighborhood: "Coyoacán", address: "Av. Insurgentes Sur s/n, Ciudad Universitaria, 04510", link: "https://www.pumas.mx/", teams: ["Pumas UNAM"] },
        { name: "Estadio Azul", type: "Sports Arena", neighborhood: "Benito Juárez", address: "Indiana 260, Ciudad de los Deportes, 03810", link: "https://www.cruzazul.com.mx/", teams: ["Cruz Azul"] },
        { name: "Arena Ciudad de México", type: "Sports Arena", neighborhood: "Azcapotzalco", address: "Av. de las Granjas 800, Santa Barbara, 02230", link: "https://www.arenaciudaddemexico.com/", teams: [] },
        { name: "Autódromo Hermanos Rodríguez", type: "Sports Arena", neighborhood: "Iztacalco", address: "Av. Viaducto Río de la Piedad s/n, Granjas México, 08400", link: "https://www.autodromohermanosrodriguez.com/", teams: [] }
    ],
    "Theaters": [
        { name: "Teatro de los Insurgentes", type: "Theater", neighborhood: "Benito Juárez", address: "Av. Insurgentes Sur 1587, San José Insurgentes, 03900", link: "https://teatroinsurgentes.com/" },
        { name: "Teatro de la Ciudad Esperanza Iris", type: "Theater", neighborhood: "Cuauhtémoc", address: "Donceles 36, Centro Histórico, 06010", link: "https://teatrodelaciudadmexico.com/" },
        { name: "Teatro Telcel", type: "Theater", neighborhood: "Cuauhtémoc", address: "Lago Zurich 245, Ampliación Granada, 11529", link: "https://teatrotelcel.com/" },
        { name: "Teatro Helénico", type: "Theater", neighborhood: "Miguel Hidalgo", address: "Av. Revolución 1500, Guadalupe Inn, 01020", link: "https://helenico.gob.mx/" },
        { name: "Foro Shakespeare", type: "Theater", neighborhood: "Cuauhtémoc", address: "Zamora 7, Condesa, 06140", link: "https://www.foroshakespeare.com/" }
    ],
    "Cultural Centers": [
        { name: "Centro Cultural de España en México", type: "Cultural Center", neighborhood: "Cuauhtémoc", address: "República de Guatemala 18, Centro Histórico, 06010", link: "https://ccemx.org/" },
        { name: "Casa del Lago Juan José Arreola", type: "Cultural Center", neighborhood: "Miguel Hidalgo", address: "Bosque de Chapultepec, Primera Sección, 11850", link: "https://casadellago.unam.mx/" },
        { name: "Centro Cultural Universitario Tlatelolco", type: "Cultural Center", neighborhood: "Cuauhtémoc", address: "Ricardo Flores Magón 1, Nonoalco Tlatelolco, 06995", link: "https://tlatelolco.unam.mx/" },
        { name: "Fábrica de Artes y Oficios (FARO) de Oriente", type: "Cultural Center", neighborhood: "Iztapalapa", address: "Calzada Ignacio Zaragoza s/n, Fuentes de Zaragoza, 09150", link: "https://farodeoriente.org/" },
        { name: "Centro Nacional de las Artes (CENART)", type: "Cultural Center", neighborhood: "Coyoacán", address: "Río Churubusco 79, Country Club, 04220", link: "https://www.cenart.gob.mx/" }
    ]
};

function loadPlaces() {
    const placesContainer = document.getElementById('places-container');
    placesContainer.innerHTML = '';

    for (const [category, venues] of Object.entries(places)) {
        const categorySection = document.createElement('section');
        categorySection.innerHTML = `<h3>${category}</h3>`;

        venues.forEach(venue => {
            const venueElement = document.createElement('div');
            venueElement.classList.add('venue');
            venueElement.innerHTML = `
                <h4>${venue.name}</h4>
                <p>Tipo: ${venue.type}</p>
                <p>Colonia: ${venue.neighborhood}</p>
                <p>Dirección: ${venue.address}</p>
                <p><a href="${venue.link}" target="_blank">Sitio Web</a></p>
                ${venue.teams ? `<p>Equipos: ${venue.teams.join(', ')}</p>` : ''}
            `;
            categorySection.appendChild(venueElement);
        });

        placesContainer.appendChild(categorySection);
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
