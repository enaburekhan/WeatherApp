import anime from 'animejs/lib/anime.es';

import {
  weatherRequest,
  inputResult,
  getData,
} from './data';

import convertTemps from './tempConvertion';

const mainScreen = document.querySelector('#main-screen');
const resultScreen = document.querySelector('#result-screen');

window.addEventListener('load', () => {
  // Animate main screen
  anime({
    targets: mainScreen,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 3000,
  });
});

const errorMsg = document.querySelector('#error');
const cityInput = document.querySelector('#search-input');

function validateInput() {
  return cityInput.value !== '';
}
async function submitHandler() {
  if (validateInput()) {
    try {
      await weatherRequest(
        cityInput.value,
      ).then((data) => inputResult(getData(data)));

      anime({
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
    await anime({
      targets: cityInput,
      translateX: [-20, 0],
    });
  }
}

const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener('click', submitHandler);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitHandler();
});

// Return

const returnBtn = document.querySelector('#return-btn');

async function resetHandler() {
  // Clean input
  cityInput.value = '';
  errorMsg.style.display = 'none';

  anime({
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
returnBtn.addEventListener('click', resetHandler);

// Converting temps

const convertBtn = document.querySelector('#convert-units-btn');
convertBtn.addEventListener('click', () => {
  convertTemps();
  // Switch button text
  convertBtn.innerText = convertBtn.innerText === 'F°' ? 'C°' : 'F°';
});
