let events = [];

async function loadEvents() {
    try {
        const response = await fetch('events.json');
        const data = await response.json();
        events = data.concerts;
        populateEvents();
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function populateEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = ''; // Clear existing events
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            <h2>${event.name}</h2>
            <p class="event-info">${event.date} at ${event.time}</p>
            <p class="event-venue">${event.venue}</p>
            <p>${event.description}</p>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

function setupTabs() {
    const tabs = document.querySelectorAll('menu[role="tablist"] a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabContents.forEach(content => content.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));

            const target = document.querySelector(tab.getAttribute('href'));
            target.classList.add('active');
            tab.classList.add('active');
        });
    });

    // Activate the first tab by default
    tabs[0].click();
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupTabs();
});
