import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=32f6c1ba8de94688b9d124752242701&q=${location}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Failed to fetch weather data.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (location.trim() === '') {
      setError('Please enter a location.');
      return;
    }

    await fetchWeatherData();
  };

  return (
<div className={`mx-auto p-4 w-screen h-screen flex items-center justify-center bg-cover bg-center ${weatherData ? 'custom-class-with-background' : ''}`} style={weatherData ? { backgroundImage: `url('src/assets/weather2.jpg')` } : { backgroundImage: `url('src/assets/weather1.jpg')` }}>
  

      <div className={`bg-blue-100 p-8 rounded-md shadow-md ${weatherData ? 'w-[1000px]' : ''}`}>
        <h1 className={`text-center text-6xl font-bold ${weatherData ? 'mt-4' : 'mt-[px]'}`}>Weather App</h1>
        <form onSubmit={handleSubmit} className="mb-4 my-10 flex">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="px-4 py-2 border border-black rounded flex-grow"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Fetch Weather
          </button>
        </form>
        {error && <p className="text-red-500 text-2xl text-center font-[600]">{error}</p>}
        {weatherData && (
          <div>
            <h2 className="text-3xl font-bold text-center my-10">
              Current Weather in {weatherData.location.name}
            </h2>
            <p className='text-3xl text-blue-900 flex justify-around '>
              <div className='gap-x-[410px]'>
            <p className='mb-4'><strong>Temperature:</strong> {weatherData.current.temp_c}°C</p>
            <p className='mb-4'><strong>Condition:</strong> {weatherData.current.condition.text}</p>
            <p className='mb-4'><strong>Wind:</strong> {weatherData.current.wind_kph} km/h</p>
            <p className='mb-4'><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
            <p className='mb-4'><strong>Pressure:</strong> {weatherData.current.pressure_mb} mb</p>
            </div>

            <div>
            <p className='mb-4'><strong>Visibility:</strong> {weatherData.current.vis_km} km</p>
            <p className='mb-4'><strong>UV Index:</strong> {weatherData.current.uv}</p>
            <p className='mb-4'><strong>Cloud Cover:</strong> {weatherData.current.cloud}%</p>
            <p className='mb-4'><strong>Wind Direction:</strong> {weatherData.current.wind_dir}</p>
            <p className='mb-4'><strong>Wind Degree:</strong> {weatherData.current.wind_degree}°</p>
            </div>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
