import { icons } from "./Icons"

export const getIcons = (temperature, precipitation, windspeed)=>{
    let weather=''
    if(temperature<=10){
        weather+= icons.snowflake
    }else if(temperature>=25){
        weather+= icons.sun
    }

    if(precipitation<1){
        weather += icons.nuageux
    }else if(precipitation>1 && precipitation<=5){
        weather+= icons.rosée
    }else if(precipitation>=10 && precipitation<20){
        weather+= icons.cloudy
    }
    else if(precipitation>=20 && precipitation<50) {
        weather+= icons.pluie
    }else{
        weather+=icons.storm
    }

    if(windspeed>25){
        weather+= icons.wind
    }

    return weather
}