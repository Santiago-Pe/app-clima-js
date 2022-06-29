// Const & Variables
const API_KEY = '9b4e7ed444bed4de85995a1dabc78df8';

//Functions

const fetchData = async (position) =>{

    // console.log(position.coords.latitude)
    // const {latitude, longitude, units} = position.coords;
    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lon=${units}&appid=${API_KEY}&units=metric`)
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))


    // console.log(position)
    try {
        loadingData(true);
        const {latitude, longitude} = position.coords;
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const data = await resp.json();


        console.log(data);
        console.log(position);
    } catch (error) {
        console.log(error);
    } finally{
        loadingData(false);
    }
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