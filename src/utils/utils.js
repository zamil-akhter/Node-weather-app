const axios = require("axios");

const getGeolocation = async (address) => {
  const mapUrl = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.MAP_APIKEY}`;
  const response = await axios.get(mapUrl);
  if (response.data.length === 0) {
    throw new Error("Location not found");
  }
  return response.data[0];
};

const getWeatherData = async (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_APIKEY}`;
  const response = await axios.get(weatherUrl);
  return response.data;
};

module.exports = {
  getGeolocation,
  getWeatherData,
};