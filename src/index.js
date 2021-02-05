class AjaxWeather {
  constructor() {
    this.apiKey = "9561863653c64bc1cc99067df8019cd4";
  } 
  async getWeather(city) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
        this.apiKey
      }&units=metric`;
      const weatherData = await fetch(url);
      const weather = await weatherData.json();
      return weather;
    }
}

class RenderDisplay {
    constructor() {
      this.results = document.querySelector(".results");
      this.cityName = document.getElementById("cityName");
      this.cityCountry = document.getElementById("cityCountry");
      this.cityIcon = document.getElementById("cityIcon");
      this.cityTemp = document.getElementById("cityTemp");
      this.cityHumidity = document.getElementById("cityHumidity");
    }

    showWeather(data) {
        // console.log(data);
        const {
          name,
          sys: { country },
          main: { temp, humidity }
        } = data;
        const { icon } = data.weather[0];
    
        this.results.classList.add("showItem");
        this.cityName.textContent = name;
        this.cityCountry.textContent = country;
        this.cityTemp.textContent = temp;
        this.cityHumidity.textContent = humidity;
        this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
      }
}   




(function (){
  
  const form = document.getElementById("wheatherForm");
  const cityInput = document.getElementById("cityInput");
  const feedback = document.querySelector(".feedback");  
  
  // class
  const ajax = new AjaxWeather();
  const display = new RenderDisplay();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city.length === 0) {
      showFeedback("city value cannot be empty");
    } else {
      ajax.getWeather(city).then(data => {
        if (data.message === "city not found") {
          showFeedback("city with such name cannot be found");
        } else {
          display.showWeather(data);
        }
      });
    }
  });

  function showFeedback(text) {
    feedback.classList.add("showItem");
    feedback.innerHTML = `<p>${text}</p>`;

    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 3000);
  }
})();