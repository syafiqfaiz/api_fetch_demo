import {  useState } from 'react'
import './App.css'

const API_KEY = 'masukkan api key anda di sini'

const App = () => {
  const [bandar, setBandar] = useState('')
  const [laporanCuaca, setLaporanCuaca] = useState({})

  const handleBandar = (event) => {
    setBandar(event.target.value)
  }

  const fetchWeatherForecast = async () => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${bandar}&days=7&aqi=no&alerts=no`);
    const data = await response.json();
    setLaporanCuaca(data)
  }

  return (
    <div className='body'>
      <input
        type='text'
        placeholder='Nama tempat'
        value={bandar}
        onChange={handleBandar}
      />
      <br/>
      <div
        className='button'
        style={{border: 'solid black 2px', marginTop: '10px'}}
        onClick={fetchWeatherForecast}
      >
        Dapatkan laporan cuaca
      </div>

      <div style={{marginTop: '10px'}}>
        Ini adalah laporan cuaca untuk <b>{bandar}</b>
      </div>
      <div>
        <h1>Laporan cuaca sekarang</h1>
        suhu = {laporanCuaca.current?.temp_c} C <br/>
      </div>
      <div>
        <h1>Laporan cuaca untuk 7 hari akan datang di {laporanCuaca.location?.name}</h1>
        {laporanCuaca.forecast?.forecastday?.map((forecast) => (
          <div style={{margin: '5px'}} key={forecast.date_epoch}>
            Pada tarikh {forecast.date}, cuaca adalah 
            <span style={{marginLeft: '2px'}}>{forecast.day.condition.text}</span>
            <img src={forecast.day.condition.icon} alt={forecast.day.condition.text} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
