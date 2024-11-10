const events = [
    {
        name: "Christmas parade in CDMX",
        date: "2024-11-23",
        time: "16:00",
        description: "Annual Christmas parade through the streets of Mexico City"
    },
    {
        name: "Corona Capital 2024",
        date: "2024-11-15",
        time: "14:30",
        description: "Music festival featuring various international artists"
    },
    {
        name: "Día de Muertos Exhibition",
        date: "2024-11-01",
        time: "10:00",
        description: "Traditional Day of the Dead exhibition at Zócalo"
    },
    {
        name: "Vive Latino",
        date: "2024-11-10",
        time: "12:00",
        description: "Latin American rock and alternative music festival"
    },
    {
        name: "CDMX Theater Festival",
        date: "2024-11-05",
        time: "19:00",
        description: "Annual theater festival showcasing local and international performances"
    }
];

function populateEvents() {
    const eventsContainer = document.getElementById('events-container');
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            <h2>${event.name}</h2>
            <p class="event-info">${event.date} at ${event.time}</p>
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
    populateEvents();
    setupTabs();
});
