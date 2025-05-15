export const formatDateHours=(date)=>{
    const hoursMinuteSeconds= date.toTimeString().split(" ")[0]
    const hoursMinutesArray= hoursMinuteSeconds.split(":")
    const hoursMinutes= hoursMinutesArray[0] + ":" + hoursMinutesArray[1]
    

    return hoursMinutes
}