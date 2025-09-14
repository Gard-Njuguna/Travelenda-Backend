const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mock weather data for popular destinations
const mockWeatherData = {
  'bali': {
    location: 'Bali, Indonesia',
    current: {
      temp: 29,
      feels_like: 32,
      humidity: 75,
      wind_speed: 12,
      weather: {
        main: 'Partly Cloudy',
        description: 'partly cloudy with occasional showers',
        icon: '04d'
      }
    },
    forecast: [
      {
        date: '2023-07-15',
        temp: { min: 26, max: 31 },
        weather: { main: 'Rain', description: 'light rain showers', icon: '10d' }
      },
      {
        date: '2023-07-16',
        temp: { min: 25, max: 30 },
        weather: { main: 'Rain', description: 'moderate rain', icon: '10d' }
      },
      {
        date: '2023-07-17',
        temp: { min: 26, max: 29 },
        weather: { main: 'Clouds', description: 'scattered clouds', icon: '03d' }
      },
      {
        date: '2023-07-18',
        temp: { min: 25, max: 30 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: '2023-07-19',
        temp: { min: 26, max: 31 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      }
    ],
    best_time_to_visit: 'April to October (dry season)'
  },
  'kyoto': {
    location: 'Kyoto, Japan',
    current: {
      temp: 24,
      feels_like: 25,
      humidity: 60,
      wind_speed: 8,
      weather: {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    },
    forecast: [
      {
        date: '2023-07-15',
        temp: { min: 20, max: 26 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: '2023-07-16',
        temp: { min: 21, max: 27 },
        weather: { main: 'Clouds', description: 'few clouds', icon: '02d' }
      },
      {
        date: '2023-07-17',
        temp: { min: 22, max: 28 },
        weather: { main: 'Rain', description: 'light rain', icon: '10d' }
      },
      {
        date: '2023-07-18',
        temp: { min: 21, max: 26 },
        weather: { main: 'Rain', description: 'moderate rain', icon: '10d' }
      },
      {
        date: '2023-07-19',
        temp: { min: 20, max: 25 },
        weather: { main: 'Clouds', description: 'scattered clouds', icon: '03d' }
      }
    ],
    best_time_to_visit: 'March-May and October-November'
  },
  'santorini': {
    location: 'Santorini, Greece',
    current: {
      temp: 27,
      feels_like: 28,
      humidity: 45,
      wind_speed: 15,
      weather: {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    },
    forecast: [
      {
        date: '2023-07-15',
        temp: { min: 23, max: 28 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: '2023-07-16',
        temp: { min: 24, max: 29 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: '2023-07-17',
        temp: { min: 24, max: 29 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: '2023-07-18',
        temp: { min: 23, max: 28 },
        weather: { main: 'Clouds', description: 'few clouds', icon: '02d' }
      },
      {
        date: '2023-07-19',
        temp: { min: 23, max: 27 },
        weather: { main: 'Clouds', description: 'scattered clouds', icon: '03d' }
      }
    ],
    best_time_to_visit: 'April to November'
  }
};

// @route   GET api/weather
// @desc    Get weather data for a location
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }

    // Check if OpenWeatherMap API key is available
    if (!process.env.OPENWEATHER_API_KEY) {
      console.log('OpenWeatherMap API key not found, using mock data');
      return res.json(getMockWeatherData(location));
    }

    try {
      // Get current weather
      const currentWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: location,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      // Get 5-day forecast
      const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: location,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const current = currentWeatherResponse.data;
      const forecast = forecastResponse.data;

      // Transform current weather data
      const currentWeather = {
        temp: Math.round(current.main.temp),
        feels_like: Math.round(current.main.feels_like),
        humidity: current.main.humidity,
        wind_speed: current.wind.speed,
        weather: {
          main: current.weather[0].main,
          description: current.weather[0].description,
          icon: current.weather[0].icon
        }
      };

      // Transform forecast data (group by day and get daily min/max)
      const dailyForecast = {};
      forecast.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            date: date,
            temp: { min: item.main.temp_min, max: item.main.temp_max },
            weather: item.weather[0]
          };
        } else {
          dailyForecast[date].temp.min = Math.min(dailyForecast[date].temp.min, item.main.temp_min);
          dailyForecast[date].temp.max = Math.max(dailyForecast[date].temp.max, item.main.temp_max);
        }
      });

      const forecastArray = Object.values(dailyForecast).slice(0, 5).map(day => ({
        date: day.date,
        temp: { 
          min: Math.round(day.temp.min), 
          max: Math.round(day.temp.max) 
        },
        weather: { 
          main: day.weather.main, 
          description: day.weather.description, 
          icon: day.weather.icon 
        }
      }));

      res.json({
        success: true,
        message: `Weather forecast for ${current.name}`,
        current: currentWeather,
        forecast: forecastArray,
        best_time_to_visit: getBestTimeToVisit(location)
      });

    } catch (apiError) {
      console.error('OpenWeatherMap API error:', apiError.response?.data || apiError.message);
      // Fallback to mock data if API fails
      res.json(getMockWeatherData(location));
    }
  } catch (error) {
    console.error('Weather data error:', error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Get best time to visit based on location
function getBestTimeToVisit(location) {
  const locationLower = location.toLowerCase();
  
  if (locationLower.includes('bali') || locationLower.includes('indonesia')) {
    return 'April to October (dry season)';
  } else if (locationLower.includes('japan') || locationLower.includes('kyoto') || locationLower.includes('tokyo')) {
    return 'March-May and October-November';
  } else if (locationLower.includes('greece') || locationLower.includes('santorini')) {
    return 'April to November';
  } else if (locationLower.includes('europe')) {
    return 'May to September';
  } else if (locationLower.includes('caribbean')) {
    return 'December to April';
  } else {
    return 'Varies by season';
  }
}

// Mock data fallback
function getMockWeatherData(location) {
  const normalizedLocation = location.toLowerCase();
  
  // Check if we have specific mock data for this location
  if (mockWeatherData[normalizedLocation]) {
    return {
      success: true,
      message: `Weather forecast for ${mockWeatherData[normalizedLocation].location}`,
      current: mockWeatherData[normalizedLocation].current,
      forecast: mockWeatherData[normalizedLocation].forecast,
      best_time_to_visit: mockWeatherData[normalizedLocation].best_time_to_visit
    };
  }
  
  // Generic mock data for unknown locations
  return {
    success: true,
    message: `Weather forecast for ${location}`,
    current: {
      temp: 25,
      feels_like: 26,
      humidity: 60,
      wind_speed: 10,
      weather: {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    },
    forecast: [
      {
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temp: { min: 22, max: 28 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      },
      {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temp: { min: 23, max: 29 },
        weather: { main: 'Clouds', description: 'few clouds', icon: '02d' }
      },
      {
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temp: { min: 22, max: 28 },
        weather: { main: 'Clouds', description: 'scattered clouds', icon: '03d' }
      },
      {
        date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temp: { min: 21, max: 27 },
        weather: { main: 'Rain', description: 'light rain', icon: '10d' }
      },
      {
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temp: { min: 22, max: 28 },
        weather: { main: 'Clear', description: 'clear sky', icon: '01d' }
      }
    ],
    best_time_to_visit: getBestTimeToVisit(location)
  };
}

module.exports = router;