import React, { useEffect, useState } from 'react'
import '../styles/Weeks.css'
import { getIcons } from '../utils/getIcons'

function Weeks({data, weatherUnits}) {

  const [weatherEmojis, setWeatherEmojis]= useState("")
  const [averageTemperature, setAverageTemperature]= useState(0)
  
  useEffect(()=> {
    if(!data) return

    const avTemp= ((data.temperature_2m_max + data.temperature_2m_min)/2).toFixed(1)

    const weatherIcons= getIcons(avTemp, data.precipitation_sum, data.wind_speed_10m_max)

    setAverageTemperature(avTemp)
    setWeatherEmojis(weatherIcons)
  }, [data])

  if(!data || !weatherUnits){
    return <div>Erreur...</div>
  }

  return (
    <div className='pred'>
      <div className='predictions_semaines'>
        <p>{data.day}</p>
        <p>{averageTemperature} <span>{weatherUnits.temperature}</span></p>
        <div className='emojis'>
          {weatherEmojis && <div>{weatherEmojis}</div> }
        </div>

      </div>
    </div>
  )
}

export default Weeks