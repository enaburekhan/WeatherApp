// import anime from 'animejs/lib/anime.es';
// import anime from 'animejs/lib/anime.es.js';
// import { default as anime } from '../node_modules/animejs/lib/anime.es.js';
import anime from 'animejs/lib/anime.es.js';

import {
  weatherRequest,
  inputResult,
  getData,
  currentUnit,
} from './data';

import { convertTemps } from './tempConvertion';

let userCity = localStorage.getItem('user_city') || undefined;

let mainScreen = document.querySelector('#main-screen');
let resultScreen = document.querySelector('#result-screen');

window.addEventListener('load', (e) => {
  //Animate main screen
  anime({
    targets: mainScreen,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 3000,
  });
});

let cityInput = document.querySelector('#search-input');
let searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', submitHandler);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitHandler();
});

let errorMsg = document.querySelector('#error');

async function submitHandler() {
  if (validateInput()) {
    try {
      let fetchWeatherData = await weatherRequest(
        cityInput.value
      ).then((data) => inputResult(getData(data)));

      let resultScreenAnimation = anime({
        targets: resultScreen,
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 3000,
        begin: () => {
          mainScreen.style.display = 'none';
          resultScreen.style.display = 'block';
        },
      });
    } catch (e) {
      console.log(e);
      errorMsg.innerText = 'No location found!';
      anime({
        targets: errorMsg,
        opacity: [0, 1],
        begin: () => {
          errorMsg.style.display = 'block';
        },
      });
    }
  } else {
    let inputAnimation = await anime({
      targets: cityInput,
      translateX: [-20, 0],
    });
  }
}

function validateInput() {
  return cityInput.value !== '';
}

//Return

let returnBtn = document.querySelector('#return-btn');
returnBtn.addEventListener('click', resetHandler);

async function resetHandler() {
  //Clean input
  cityInput.value = '';
  errorMsg.style.display = 'none';

  let mainScreenAnimation = anime({
    targets: mainScreen,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 3000,
    begin: () => {
      mainScreen.style.display = 'block';
      resultScreen.style.display = 'none';
    },
  });
}

//Converting temps

const convertBtn = document.querySelector('#convert-units-btn');
convertBtn.addEventListener('click', (e) => {
  convertTemps();
  //Switch button text
  convertBtn.innerText = convertBtn.innerText == 'F°' ? 'C°' : 'F°';
});
