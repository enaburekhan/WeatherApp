



(function (){
  
  const form = document.getElementById("wheatherForm");
  const cityInput = document.getElementById("cityInput");
  const feedback = document.querySelector(".feedback");  
  
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