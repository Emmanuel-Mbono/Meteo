import React, { useEffect, useState } from 'react'
import { getIcons } from '../utils/getIcons'
import { icons } from '../utils/Icons'
import { formatDateHours } from '../utils/forrmatDateHours'
import '../styles/Today.css'

function Today({data, weatherUnits}) {
  const [weatherEmojis, setWeatherEmojis]= useState("")

    useEffect(()=> {
      if(!data) return
  
      const avTemp= ((data.temperature_2m_max + data.temperature_2m_min)/2).toFixed(1)
  
      const weatherIcons= getIcons(avTemp, data.precipitation_sum, data.wind_speed_10m_max)
  
      setWeatherEmojis(weatherIcons)
    }, [data])

  if(!data || !weatherUnits){
    return <div>Aucune données. Affichage impossible</div>
  }
  return (
    <div className='box'>
      <div className='box1'>
        <div className='box_day'>
          <div className='logo_jour'>{weatherEmojis}</div>
          <div className='jour_day'>
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div className='info_jour'>
          <p>{icons.calendar} Jour: {data.day}</p>
          <p>{icons.cloudy} Pluie: {data.precipitation_sum} {weatherUnits.rain}</p>
          <p>{icons.sunrise} Levé du soleil: {formatDateHours(new Date(data.sunrise))}</p>
          <p>{icons.sunset} Couché du soleil: {formatDateHours(new Date(data.sunset))}</p>
          <p>{icons.temperature} Température Max: {data.temperature_2m_max} {" "} {weatherUnits.temperature}</p>
          <p>{icons.wind} Vent: {data.wind_speed_10m_max} {" "} {weatherUnits.wind}</p>
        </div>
      </div>
    </div>
  )
}

export default Today