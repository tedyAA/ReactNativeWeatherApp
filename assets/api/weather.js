import axios from "axios";

const apiKey = '1cf838aa8644549473bdf55ad4147ca1'
const weatherUrlBase = 'https://api.openweathermap.org/data/2.5/'

const weatherEndpoint = params => `${weatherUrlBase}weather?q=${params.query}&units=metric&appid=${apiKey}`

const apiCall = async (endpoint)=>{
    const options = {
        method: 'GET',
        url: endpoint
    }
    try{
      const response = await axios.request(options)
      return response.data
    }catch(err){
        console.log('err',err)
        return null;
    }
}

export const fetchForecast = params =>{
    return apiCall(weatherEndpoint(params))
}

export const fetchLocations = params =>{
    return apiCall(weatherEndpoint(params))
}
