import axios from "axios";

const apiKey = 'beaa71f3be8743dc967131426251510'
const forecastEndpoint = params => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no`
const locationsEndpoint = params => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

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
    return apiCall(forecastEndpoint(params))
}

export const fetchLocations = params =>{
    return apiCall(locationsEndpoint(params))
}
