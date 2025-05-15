import { useCallback, useEffect, useState } from 'react'
import '../styles/Desc_weather.css'
import { formatWeatherDataDaily } from '../utils/formatWeatherDataDaily'
import Today from './Today.jsx'
import Weeks from './Weeks.jsx'
import Previsions from './Previsions.jsx'

function Desc(){
    const[isLoading, setIsLoading]= useState(false)
    const [error, setError]= useState(false)
    const [geoLoc, setGeoLoc]= useState({latitude:0, longitude:0})
    const[weatherUnits, setWeatherUnits]= useState({})
    const [weatherData, setWeatherData]= useState([])


    const fetchWeather= useCallback(async(url)=>{
        setError(false)

        try{
            const res= await fetch(url)
            const data= await res.json()
            console.log(data)                               

            if(Object.keys(data).length===0){
                setError(true)
            }else{
                //formated daily data
                const formatedDailyData= formatWeatherDataDaily(data.daily)
                setWeatherData(formatedDailyData)
                //units
                setWeatherUnits({
                    rain: data.daily_units.precipitation_sum,
                    temperature:data.daily_units.temperature_2m_max,
                    wind: data.daily_units.wind_speed_10m_max,
                })
            }
            
        }catch(error){
            
        }
    }, [])

    useEffect(()=>{
        setIsLoading(true)

        if(!navigator.geolocation){
            window.alert('votre navigateur ne permet pas la geolocalisation  pour utiliser cette application ');
        }

        getGeolocalisation();
        fetchWeather(`https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m&timezone=auto`)
    }, [fetchWeather, geoLoc.latitude, geoLoc.longitude])

    const getGeolocalisation= ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setGeoLoc({latitude:position.coords.latitude, longitude:position.coords.longitude})
        }, ()=>{
            setError(true)
        })
    }



    //si error
    if(error){
        return(
            <div>
                <p>Une erreur est survenue lors de la recuperation des previsions metéo...</p>
            </div>
        )
    }

    return(
        <div className='met-lis-description'>
            <div>
                <Today data={weatherData[0]} weatherUnits={weatherUnits} />
                <Previsions />
                <div>{weatherData && weatherData.slice(1, weatherData.length).map((data, index)=>
                    <Weeks key={index} data={data} weatherUnits={weatherUnits}  />
                )}</div>
            </div>

        </div>
    )

    
}

export default Desc