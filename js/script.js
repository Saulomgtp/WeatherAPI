const apiKey = "c493855284163b2b750a348f4ba8d7fc"
const apiCountryURL = "https://www.countryflagicons.com/SHINY/64/"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const caixaInicio = document.querySelector("#weather-data")



const getFoto = async (city) => {
    const apiURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=3bnj4PcQQxwaIbzmWOM85BuVM1cv8VufgpVmHO7fT2M`
    const res = await fetch(apiURL)
    const data = await res.json()
    const imagem = data.results[0].links.download
    document.body.style.backgroundImage = `url(${imagem})`
    document.body.style.backgroundSize = "cover"
    return imagem
}


const getWeatherData = async (city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    
    const res = await fetch (apiWeatherURL)
    const data = await res.json()

    cityElement.innerHTML = data.main.name

    return data
}


const showWeatherData = async (city) => {
    const data = await getWeatherData(city)


    console.log(data)

    cityElement.innerHTML = data.name
    tempElement.innerHTML = parseInt(data.main.temp)
    descElement.innerHTML = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
    weatherIconElement.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
    countryElement.src = apiCountryURL + data.sys.country + ".png"
    umidityElement.innerHTML = data.main.humidity + "%"
    windElement.innerHTML = data.wind.speed + "km/h"

    getFoto(city)

    caixaInicio.removeAttribute("class", "hide")

}


searchBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener("keydown", (evt) => {
    if(evt.code === "Enter") {
        const city = evt.target.value

        showWeatherData(city)
    }
    

})