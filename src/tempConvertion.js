import { currentUnit } from './data';

let temp = document.querySelector('#result-temp');
let minTemp = document.querySelector('#result-mintemp');
let maxTemp = document.querySelector('#result-maxtemp');
let feelingTemp = document.querySelector('#result-feeling');

let tempsElem = [temp, minTemp, maxTemp, feelingTemp];

function convertTemps() {
  let temps = tempsElem.map(
    (temp) => temp.innerText.match(/-?[\d\.]+(?=[°])/)[0]
  );
  tempsElem.forEach((tempElem, index) => {
    let convertedTemp = convertTemp(temps[index]);
    tempElem.innerText = `${Math.round(convertedTemp * 10) / 10}°`;
  });
  currentUnit = currentUnit === 0 ? 1 : 0;
}

function convertTemp(temp) {
  //Convert from celsius to fahrenheit
  if (currentUnit === 0) {
    return 1.8 * Number(temp) + 32;
  } else if (currentUnit === 1) {
    //Convert from fahrenheit to celsius
    return (5 / 9) * (Number(temp) - 32);
  }
}

export { convertTemps };
