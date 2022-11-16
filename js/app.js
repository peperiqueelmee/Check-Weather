//Variables
const container = document.querySelector('.container');
const result = document.querySelector('#result');
const form = document.querySelector('#form');


//Listeners
window.addEventListener('load', () => {
    form.addEventListener('submit', searchCity)
})


//Functions
function searchCity(e) {
    e.preventDefault();

    //Validations
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;

    if (city === '' || country === '') {
        showError('Ambos campos son obligatorios');
        return;
    }

    //Consult API
    getWeather(city, country);
}

function showError(message) {
    const alert = document.querySelector('.bg-red-100');

    if (!alert) {
        //Create Alert
        const alert = document.createElement('div');

        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4',
            'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alert.innerHTML = `
            <strong class="font-bold"> ¡Error!</strong>
            <span class="block"> ${message}</span>
        `;
        container.appendChild(alert);

        //Remover alert before three seconds
        setTimeout(() => {
            alert.remove();
        }, 3000)
    }
}

function getWeather(city, country) {
    const appID = 'be4132f9faf9fe2011b1e1ea5179faf9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appID}`;

    showSpinner();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            cleanHTML();

            //Validate city found
            if (data.cod === "404") {
                showError('Ciudad no encontrada');
                return;
            }

            showWeather(data);
        })
}

function showWeather(data) {
    const { name, main: { temp, temp_max, temp_min } } = data;

    const cityName = document.createElement('p');
    cityName.innerHTML = `Clima en <span class="text-yellow-300">${name}</span>`;
    cityName.classList.add('font-bold', 'text-2xl');

    const currentTemperature = ConvertKelvinToCentigrade(temp);
    const minTemperature = ConvertKelvinToCentigrade(temp_min);
    const maxTemperature = ConvertKelvinToCentigrade(temp_max);

    //Create result paragraphs
    const pCurrentTemperature = document.createElement('p');
    pCurrentTemperature.innerHTML = `${currentTemperature} &#8451`;
    pCurrentTemperature.classList.add('font-bold', 'text-6xl');

    const pTempMin = document.createElement('p');
    pTempMin.innerHTML = `Min: ${minTemperature} &#8451`;
    pTempMin.classList.add('text-xl');

    const pTempMax = document.createElement('p');
    pTempMax.innerHTML = `Max: ${maxTemperature} &#8451`;
    pTempMax.classList.add('text-xl');

    //Assigning paragraphs to parent Div
    const divResult = document.createElement('div');
    divResult.classList.add('text-center', 'text-white');
    divResult.appendChild(cityName);
    divResult.appendChild(pCurrentTemperature);
    divResult.appendChild(pTempMin);
    divResult.appendChild(pTempMax);

    result.appendChild(divResult);
}

const ConvertKelvinToCentigrade = degrees  => parseInt(degrees  - 273.15);

function cleanHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
}

function showSpinner() {
    cleanHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    result.appendChild(divSpinner);
}