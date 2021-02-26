import { toggleUnit } from './data';

const temp = document.querySelector('#result-temp');
const minTemp = document.querySelector('#result-mintemp');
const maxTemp = document.querySelector('#result-maxtemp');
const feelingTemp = document.querySelector('#result-feeling');

const tempsElem = [temp, minTemp, maxTemp, feelingTemp];

function convertTemp(temp) {
  // Convert from celsius to fahrenheit
  if (toggleUnit.currentUnit === 0) {
    return 1.8 * Number(temp) + 32;
  } if (toggleUnit.currentUnit === 1) {
    // Convert from fahrenheit to celsius
    return (5 / 9) * (Number(temp) - 32);
  }
  return -1;
}
convertTemp(temp);

function convertTemps() {
  const temps = tempsElem.map(
    (temp) => temp.innerText.match(/-?[\d.]+(?=[°])/)[0],
  );
  tempsElem.forEach((tempElem, index) => {
    const convertedTemp = convertTemp(temps[index]);
    tempElem.innerText = `${Math.round(convertedTemp * 10) / 10}°`;
  });
  toggleUnit.currentUnit = toggleUnit.currentUnit === 0 ? 1 : 0;
}

export default convertTemps;
