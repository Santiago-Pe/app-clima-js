// Const & Variables
const API_KEY = '9b4e7ed444bed4de85995a1dabc78df8';

//Functions

const fetchData = position =>{

    // console.log(position.coords.latitude)
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(resp => resp.json())
        .then(data => console.log(data))


    console.log(position)
    // try {
    //     loadingData(true);
    //     const {latitude, longitude} = position.coords;
    //     const resp = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    //     const data = await resp.json();


    //     console.log(data)
    // } catch (error) {
    //     console.log(error);
    // } finally{
    //     loadingData(false);
    // }
}
const loadingData = state => {
    state ? console.log('Cargando data') : console.log('Cargado');
}
const onLoad = () =>{
    navigator.geolocation.getCurrentPosition(fetchData)
}

//Algorithm
document.addEventListener('DOMContentLoaded', ()=>{
    onLoad()

})