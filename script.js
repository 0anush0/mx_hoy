document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    loadPlaces();

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
        `;
        eventList.appendChild(eventElement);
    });
}

function loadPlaces() {
    const places = {
        'concert-venues': ['Foro Sol', 'Palacio de los Deportes', 'Auditorio Nacional', 'Teatro Metropólitan', 'Palacio de Bellas Artes', 'Plaza Condesa', 'Pepsi Center WTC', 'Sala Nezahualcóyotl'],
        'museums': ['Museo Nacional de Antropología', 'Museo Soumaya', 'Museo Frida Kahlo', 'Museo Nacional de Historia', 'Museo de Arte Moderno', 'Museo Jumex', 'Museo Tamayo', 'MUAC'],
        'parks': ['Bosque de Chapultepec', 'Parque México', 'Alameda Central', 'Parque Ecológico de Xochimilco', 'Parque Hundido', 'Bosque de Tlalpan', 'Parque La Mexicana', 'Viveros de Coyoacán'],
        'sports-venues': ['Estadio Azteca', 'Estadio Olímpico Universitario', 'Arena Ciudad de México', 'Autódromo Hermanos Rodríguez', 'Hipódromo de las Américas', 'Arena México']
    };

    for (const [category, placeList] of Object.entries(places)) {
        const ul = document.getElementById(category);
        placeList.forEach(place => {
            const li = document.createElement('li');
            li.textContent = place;
            ul.appendChild(li);
        });
    }
}

async function submitEmail(email) {
    console.log(`Email submitted: ${email}`);
    alert('¡Gracias por unirte! Revisa tu correo para info exclusiva y sorpresas VIP.');
}
