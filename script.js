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
        {
            name: "Cinépolis | Forum Buenavista",
            type: "Movie Theater",
            neighborhood: "Cuauhtémoc",
            address: "Av. Insurgentes Nte. 259, Buenavista, Cuauhtémoc, 06350",
            link: "http://www.cinepolis.com"
        },
        {
            name: "La Casa del Cine",
            type: "Movie Theater",
            neighborhood: "Cuauhtémoc",
            address: "República de Uruguay 52-segundo piso, Centro Histórico de la Cdad. de México",
            link: "http://lacasadelcine.mx"
        },
        {
            name: "Cineteca Nacional",
            type: "Movie Theater",
            neighborhood: "Benito Juárez",
            address: "Av. México Coyoacán 389, Xoco, 03330",
            link: "http://www.cinetecanacional.net"
        },
        {
            name: "Cine Tonalá",
            type: "Movie Theater",
            neighborhood: "Cuauhtémoc",
            address: "Tonalá 261, Roma Sur, 06760",
            link: "http://www.cinetonala.mx"
        },
        {
            name: "Cinépolis Diana",
            type: "Movie Theater",
            neighborhood: "Cuauhtémoc",
            address: "Av. P.º de la Reforma 423, 06500",
            link: "https://cinepolis.com/cartelera/cdmx-centro/cinepolis-diana"
        }
    ],
    "Concert Venues": [
        {
            name: "Teatro Metropólitan",
            type: "Concert Venue",
            neighborhood: "Cuauhtémoc",
            address: "Av. Independencia 90, 06700",
            link: "https://www.teatrometropolitan.com"
        },
        {
            name: "Pepsi Center WTC",
            type: "Concert Venue",
            neighborhood: "Benito Juárez",
            address: "Avenida de los Insurgentes Sur 706, 03870",
            link: "https://www.pepsicenterwtc.com"
        },
        {
            name: "Foro Sol",
            type: "Concert Venue",
            neighborhood: "Iztacalco",
            address: "Av. Viaducto Río de la Piedad y Río Churubusco s/n, Granjas México, 08400",
            link: "https://www.forosol.mx"
        },
        {
            name: "Palacio de los Deportes",
            type: "Concert Venue",
            neighborhood: "Iztacalco",
            address: "Av. Río Churubusco y Añil s/n, Granjas México, 08400",
            link: "https://www.palaciodelosdeportes.com.mx"
        }
    ],
    "Museums": [
        {
            name: "Museo Nacional de Antropología",
            type: "Museum",
            neighborhood: "Chapultepec",
            address: "Av. Paseo de la Reforma & Calzada Gandhi, Chapultepec Polanco, 11560",
            link: "https://mna.inah.gob.mx/"
        },
        {
            name: "Museo Soumaya",
            type: "Museum",
            neighborhood: "Polanco",
            address: "Blvd. Miguel de Cervantes Saavedra 303, Granada, 11529",
            link: "https://www.museosoumaya.org/"
        },
        {
            name: "Museo Universitario Arte Contemporáneo",
            type: "Museum",
            neighborhood: "Coyoacán",
            address: "Insurgentes Sur 3000, C.U., 04510",
            link: "https://muac.unam.mx/"
        },
        {
            name: "Museo Frida Kahlo",
            type: "Museum",
            neighborhood: "Coyoacán",
            address: "Londres 247, Del Carmen, 04100",
            link: "https://www.museofridakahlo.org.mx/"
        }
    ],
    "Sports Arenas": [
        {
            name: "Estadio Azteca",
            type: "Sports Arena",
            neighborhood: "Coyoacán",
            address: "Calz. de Tlalpan 3465, Santa Úrsula Coapa, 04650",
            link: "https://www.estadioazteca.com.mx/",
            teams: ["Club América", "Cruz Azul"]
        },
        {
            name: "Estadio Olímpico Universitario",
            type: "Sports Arena",
            neighborhood: "Coyoacán
