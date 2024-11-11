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
        'skate-parks': ['Skatepark Templo Mayor', 'La Mexicana Skatepark', 'Parque Bicentenario Skatepark', 'Skatepark Constituyentes', 'Skatepark Xochimilco'],
        'underground-galleries': ['Border', 'Galería Libertad', 'Antimuseo', 'Biquini Wax EPS', 'Salón Silicón'],
        'cult-cinemas': ['Cine Tonalá', 'La Casa del Cine', 'Cineteca Nacional', 'Cinemanía', 'Cine Villa Olímpica'],
        'night-clubs': ['M.N. Roy', 'Yu Yu', 'Departamento', 'Foro Normandie', 'Patrick Miller']
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
    alert('¡Bienvenido a la comunidad underground! Revisa tu correo para info exclusiva.');
}
