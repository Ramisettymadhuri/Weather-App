const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '2e58ac8c0994efac4bc989989f267bcf';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '500px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '650px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            cityHide.textContent = city;

            temperature.textContent = `${json.main.temp} °C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${(json.wind.speed * 3.6).toFixed(1)}Km/h`; // Convert m/s to Km/h

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear-removebg-preview.png';
                    break;
                case 'Rain':
                    image.src = 'rain-removebg-preview.png';
                    break;
                case 'Snow':
                    image.src = 'snow-removebg-preview.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud-removebg-preview.png';
                    break;
                case 'Haze':
                    image.src = 'haze-removebg-preview.png';
                    break;
                default:
                    image.src = 'cloud-removebg-preview.png';
                    break;
            }
        });
});