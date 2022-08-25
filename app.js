// Const & Variables
const API_KEY = '9b4e7ed444bed4de85995a1dabc78df8';
// const preloader = document.getElementById('preolader');
// const btnWeather = document.getElementById('btn-weather')

//Functions

// Llamado a la API
const fetchData = async (position) => {
    try {
        // btnWeather.classList.add('d-none')
        loadingData(true);

        const {latitude, longitude, city} = position.coords;
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}`);
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
    state ? console.log('Cargando...') : console.log('Finalizó la carga');
}
// Localizador
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
// Pintar informacion en DOM
const printData = (data) => {

    const templateWeather = document.getElementById('template-weather').content;
    const fragment = document.createDocumentFragment();
    const  contentWeather = document.getElementById('dynamic-content');
    
        

    const dataWeather = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        feelsLike: data.main.feels_like,
        windSpeed: data.wind.speed,
        date: getDate(),
    }
    Object.keys(dataWeather).forEach(key => {
        const clone = templateWeather.cloneNode(true);
        clone.getElementById(key).textContent = dataWeather[key];
        fragment.appendChild(clone)
        console.log(clone)
    })
    contentWeather.appendChild(fragment)

    console.log(dataWeather)

}
// Obtener Fecha
const getDate = () => {
    let date = new Date ();
    return `${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`

}

// Algorithm
// btnWeather.addEventListener('click', ()=>{
//     onLoad()

// })