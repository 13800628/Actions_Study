import { useState, useEffect } from 'react'
import './App.css'

// 1. APIから返ってくるデータの「型」を定義する
interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // 東京の緯度経度で天気を取得
  const lat = 35.6895;
  const lon = 139.6917;

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then((data: WeatherData) => {
        setWeather(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>読み込み中...</div>;

  return (
    <div className="App">
      <h1>東京の今の天気 🗼</h1>
      <div className="card">
        <p style={{ fontSize: '2rem' }}>
          温度: <strong>{weather?.current_weather.temperature}℃</strong>
        </p>
        <p>風速: {weather?.current_weather.windspeed} km/h</p>
      </div>
      <p className="read-the-docs">
        Powered by Open-Meteo API
      </p>
    </div>
  )
}

export default App