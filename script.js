let events = [];
let venues = [];

async function loadEvents() {
    try {
        const response = await fetch('events.json');
        const data = await response.json();
        events = data.concerts;
        venues = [...new Set(events.map(event => event.venue))];
        populateEvents();
        populateVenues();
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function populateEvents() {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const eventElement = createEventElement(event);
        eventsContainer.appendChild(eventElement);
    });
}

function populateVenues() {
    const venuesList = document.getElementById('venues-list');
    venuesList.innerHTML = '';
    venues.forEach(venue => {
        const li = document.createElement('li');
        li.textContent = venue;
        venuesList.appendChild(li);
    });
}

function createEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    eventElement.innerHTML = `
        <h2>${event.name}</h2>
        <p class="event-info">${event.date} a las ${event.time}</p>
        <p class="event-venue">${event.venue}</p>
        <p>${event.description}</p>
    `;
    return eventElement;
}

function setupTabs() {
    const tabs = document.querySelectorAll('menu[role="tablist"] a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabContents.forEach(content => content.style.display = 'none');
            tabs.forEach(t => t.classList.remove('active'));

            const target = document.querySelector(tab.getAttribute('href'));
            target.style.display = 'block';
            tab.classList.add('active');
        });
    });

    // Activate the first tab by default
    tabs[0].click();
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredEvents = events.filter(event =>
            event.name.toLowerCase().includes(query) ||
            event.venue.toLowerCase().includes(query)
        );

        searchResults.innerHTML = '';
        filteredEvents.forEach(event => {
            const eventElement = createEventElement(event);
            searchResults.appendChild(eventElement);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    setupTabs();
    setupSearch();
});
