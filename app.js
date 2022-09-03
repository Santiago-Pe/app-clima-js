// Const & Variables
const API_KEY = '9b4e7ed444bed4de85995a1dabc78df8';
const preloader = document.getElementById('preolader');
const  contentWeather = document.getElementById('dynamic-content');
const btnSearch = document.getElementById('search');
const input = document.getElementById('input');
//Functions

// Llamado a la API
// El parametro "va a llevar el nombre escrito por el usario en el Input"
const fetchData = async (city) => {
    try {

        loadingData(true);

        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await resp.json();
        printData(data);

        console.log(data)


    } catch (error) {
        console.log(error);
    } finally{
        loadingData(false);
    }
}
// Preloader
const loadingData = state => {
    state ? preloader.classList.remove('d-none') : preloader.classList.add('d-none');
}

// Pintar informacion en DOM
const printData = (data) => {

    const templateWeather = document.getElementById('template-weather').content;
    const fragment = document.createDocumentFragment();
    
        

    const dataWeather = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        // pressure: data.main.pressure,
        temperature: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        feelsLike: data.main.feels_like,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        country: data.sys.country,
        date: getDate(),
    }
    const clone = templateWeather.cloneNode(true);


    clone.getElementById('date').textContent = dataWeather.date;
    clone.getElementById('location').textContent = `Weather in ${dataWeather.location}, ${dataWeather.country}`;
    clone.getElementById('icon').scr = `https://openweathermap.org/img/wn/${dataWeather.icon}.png`;

    clone.getElementById('description').textContent = `${dataWeather.description}`;
    clone.getElementById('temperature').textContent = `${dataWeather.temperature} ºC`;
    clone.getElementById('humidity').textContent = `Humidity:  ${dataWeather.humidity}`;
    clone.getElementById('wind').textContent = `Wind Speed:  ${dataWeather.wind}`;

    clone.getElementById('min-temp').textContent = `Min temperature:  ${dataWeather.tempMin}`;
    clone.getElementById('max-temp').textContent = `Max temperature:  ${dataWeather.tempMax}`;
    clone.getElementById('feels-like').textContent = `Feels Like:  ${dataWeather.feelsLike}`;


    
    fragment.appendChild(clone)
    contentWeather.appendChild(fragment)

    // console.log(dataWeather)

}
// Obtener Fecha
const getDate = () => {
    let date = new Date ();
    return `${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`

}

// Search Funciton
const searchWeather = () =>{
    contentWeather.textContent = "";
    fetchData(input.value) 
}

// Dispara el evento el click en el boton
btnSearch.addEventListener('click', () =>{
        searchWeather();
})
// Dispara el evento el enter en el input
input.addEventListener('keyup', (event) =>{
    if(event.key === "Enter"){
        searchWeather();
    }
})