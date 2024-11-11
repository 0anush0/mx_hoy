document.addEventListener('DOMContentLoaded', function() {
    // Load events
    loadEvents();

    // Handle tab clicks
    const tabs = document.querySelectorAll('nav ul li a');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const sections = document.querySelectorAll('main > section');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Show the first section by default
    document.querySelector('nav ul li a').click();

    // Handle email form submission
    document.getElementById('email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        submitEmail(email);
    });
});

async function loadEvents() {
    // Fetch events from local events.json file
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

async function submitEmail(email) {
    // Send email to backend for giveaway entry
    try {
        const response = await fetch('/api/giveaway', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error submitting email:', error);
        alert('Hubo un error al enviar tu correo. Por favor, intenta de nuevo.');
    }
}
