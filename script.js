document.addEventListener('DOMContentLoaded', function() {
    // Load events
    loadEvents();

    // Load weather
    loadWeather();

    // Load AI recommendations
    loadRecommendations();

    // Handle email form submission
    document.getElementById('email-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        submitEmail(email);
    });
});

async function loadEvents() {
    // Fetch events from your backend API
    try {
        const response = await fetch('/api/events');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function displayEvents(events) {
    const destacadosSection = document.getElementById('destacados');
    // Clear existing content
    destacadosSection.innerHTML = '<h2>Eventos Destacados</h2>';

    // Display events
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} - ${event.location}</p>
            <p>${event.description}</p>
        `;
        destacadosSection.appendChild(eventElement);
    });
}

async function loadWeather() {
    // Fetch weather data from a weather API
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Mexico+City&appid=YOUR_API_KEY&units=metric');
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error loading weather:', error);
    }
}

function displayWeather(weatherData) {
    const climaSection = document.getElementById('clima');
    climaSection.innerHTML = `
        <h2>Clima en CDMX</h2>
        <p>Temperatura: ${weatherData.main.temp}°C</p>
        <p>Condición: ${weatherData.weather[0].description}</p>
    `;
}

async function loadRecommendations() {
    // In the future, this will fetch AI-generated recommendations
    // For now, we'll use placeholder data
    const recommendations = [
        "Concierto de rock en el Foro Sol",
        "Exposición de arte contemporáneo en el Museo Jumex",
        "Partido de fútbol en el Estadio Azteca"
    ];
    displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
    const recomendacionesSection = document.getElementById('recomendaciones');
    recomendacionesSection.innerHTML = '<h2>Recomendaciones AI</h2>';
    const list = document.createElement('ul');
    recommendations.forEach(rec => {
        const item = document.createElement('li');
        item.textContent = rec;
        list.appendChild(item);
    });
    recomendacionesSection.appendChild(list);
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
