/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
let currentUnit = 0; // 0 - Celsius 1 - Fahrenheit
/* eslint-enable import/no-mutable-exports */
/* eslint-enable prefer-const */

function parseTemp(temp) {
  const parsedTemp = currentUnit === 0 ? Number(temp) - 273.1 : 1.8 * (Number(temp) - 273) + 32;
  return Math.round(parsedTemp * 10) / 10;
}

function getData(weatherData) {
  const city = weatherData.name;
  const { country } = weatherData.sys;
  const place = `${city}, ${country}`;
  const { main: weatherTitle, description: weatherDesc } = weatherData.weather[0];
  const details = weatherData.main;
  const {
    feels_like: feeling,
    humidity,
    pressure,
    temp,
    temp_max: maxTemp,
    temp_min: minTemp,
  } = details;

  return {
    place,
    weatherTitle,
    weatherDesc,
    feeling: parseTemp(feeling),
    humidity,
    pressure,
    temp: parseTemp(temp),
    maxTemp: parseTemp(maxTemp),
    minTemp: parseTemp(minTemp),
  };
}

function inputResult({
  place,
  weatherTitle,
  weatherDesc,
  feeling,
  humidity,
  pressure,
  temp,
  maxTemp,
  minTemp,
}) {
  const results = [
    { elementId: '#result-temp', value: `${temp}°` },
    { elementId: '#result-place', value: place },
    { elementId: '#result-weather', value: weatherTitle },
    { elementId: '#result-weather-desc', value: weatherDesc },
    { elementId: '#result-feeling', value: `${feeling}°` },
    { elementId: '#result-humidity', value: `${humidity}%` },
    { elementId: '#result-pressure', value: `${pressure}mb` },
    { elementId: '#result-mintemp', value: `${minTemp}°` },
    { elementId: '#result-maxtemp', value: `${maxTemp}°` },
  ];
  /* eslint-disable no-restricted-syntax */
  for (const { elementId, value } of results) {
    document.querySelector(elementId).innerText = value;
  }
  /* eslint-enable no-restricted-syntax */
}

// using promise
async function weatherRequest(city) {
  const apiKey = '9561863653c64bc1cc99067df8019cd4';
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`,
    );
    const data = await response.json();
    return data;
  } catch (e) {
    return (e);
  }
}

export {
  weatherRequest, inputResult, getData, parseTemp, currentUnit,
};
