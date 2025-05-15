import Header from './Header';
import '../styles/App.css';
import '../styles/Header.css'
import '../styles/Layout.css'
import weather from '../assets/weather.png'
import Bord from './Bord';
import Desc from './Desc';

function App() {
    //https://api.open-meteo.com/v1/forecast?latitude=4.0483&longitude=9.7043&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max&hourly=temperature_2m&timezone=auto

    return(
        <div className='back'>
            <Header>
                <img className='met-logo' alt='logo'  src={weather}/>
                <h1 className='met-title'>Met-app</h1>
            </Header>
            <div className='met-layout-inner'>
                <Bord />
                <Desc />
            </div>
        </div>
    )
}

export default App;
