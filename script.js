const board = document.getElementById('weather');
const API = '455bdd01213a436b9d195824230111';
const LOCAL_STORAGE_WEATHER_KEY = 'weather.list';
const LOCAL_STORAGE_FORECAST_KEY = 'weather.forecast';
let weatherLists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER_KEY));

let forecastWeatherLists = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_FORECAST_KEY) || []
);

function currentDate() {
  const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1; // January is 0
  const year = today.getFullYear();

  if (date < 10) {
    date = `0${date}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  const currenDate = `${date} ${months[month]} ${year}`;
  return currenDate;
}

function currentDay() {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];

  return dayOfWeek;
}

async function getForecastWeather(userInput) {
  try {
    const forecastWeather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${userInput}&days=4&hour=9`,
      { mode: 'cors' }
    );
    const forecastWeatherJson = await forecastWeather.json();
    const readyToUseJson = forecastWeatherFunction(forecastWeatherJson);
    forecastWeatherLists.push(readyToUseJson);
    forecastWeatherLists = forecastWeatherLists.filter(
      (item) => item.id === readyToUseJson.id
    );
    saveAndRender();
  } catch (error) {
    return error;
  }
}

function forecastWeatherFunction(Json) {
  const { name } = Json.location;
  const day1 = Json.forecast.forecastday[0].date;
  const day2 = Json.forecast.forecastday[1].date;
  const day3 = Json.forecast.forecastday[2].date;
  const day4 = Json.forecast.forecastday[3].date;
  const icon1 = Json.forecast.forecastday[0].day.condition.icon;
  const icon2 = Json.forecast.forecastday[1].day.condition.icon;
  const icon3 = Json.forecast.forecastday[2].day.condition.icon;
  const icon4 = Json.forecast.forecastday[3].day.condition.icon;
  const temp1 = Json.forecast.forecastday[0].day.avgtemp_c;
  const temp2 = Json.forecast.forecastday[1].day.avgtemp_c;
  const temp3 = Json.forecast.forecastday[2].day.avgtemp_c;
  const temp4 = Json.forecast.forecastday[3].day.avgtemp_c;
  const id = Date.now().toString();

  return {
    name,
    day1,
    day2,
    day3,
    day4,
    icon1,
    icon2,
    icon3,
    icon4,
    temp1,
    temp2,
    temp3,
    temp4,
    id,
  };
}

function getDayFromDate(dateInput) {
  const date = new Date(dateInput);
  const options = { weekday: 'long' };
  const day = date.toLocaleDateString('en-US', options);

  return day.slice(0, 3);
}
// Output: Saturday

async function getCurrentWeather(userInput) {
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API}&q=${userInput}`,
      { mode: 'cors' }
    );
    const weatherJson = await weather.json();
    const readyToUseJson = currentWeather(weatherJson);
    weatherLists.push(readyToUseJson);
    weatherLists = weatherLists.filter((item) => item.id === readyToUseJson.id);
    saveAndRender();
  } catch (error) {
    return error;
  }
}
function currentWeather(Json) {
  const { country } = Json.location;
  const city = Json.location.name;
  const temp = Json.current.temp_c;
  const condition = Json.current.condition.text;
  const { icon } = Json.current.condition;
  const { humidity } = Json.current; // * Влажность воздуха
  const wind = Json.current.wind_kph;
  const feelslike = Json.current.feelslike_c;
  const id = Date.now().toString();
  return {
    country,
    city,
    temp,
    condition,
    icon,
    humidity,
    wind,
    feelslike,
    id,
  };
}

function saveAndRender() {
  localStorage.setItem(
    LOCAL_STORAGE_FORECAST_KEY,
    JSON.stringify(forecastWeatherLists)
  );
  localStorage.setItem(LOCAL_STORAGE_WEATHER_KEY, JSON.stringify(weatherLists));
  renderWeather();
}

function clearList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderWeather() {
  // board.innerHTML = '';
  if (weatherLists.length === 0) {
    return;
  }
  clearList(board);
  // ! start of right top
  const right = document.createElement('div');
  right.classList.add('right');
  const rightTop = document.createElement('div');
  rightTop.classList.add('right-top');
  const humidity = document.createElement('div');
  humidity.classList.add('humidity');
  humidity.textContent = 'Humidity';
  const valueOfHumidity = document.createElement('div');
  valueOfHumidity.classList.add('value');
  valueOfHumidity.textContent = `${weatherLists[0].humidity}%`;
  const wind = document.createElement('div');
  wind.classList.add('wind');
  wind.textContent = 'Wind';
  const valueOfWind = document.createElement('div');
  valueOfWind.classList.add('value');
  valueOfWind.textContent = `${weatherLists[0].wind} km/h`;
  const feelslike = document.createElement('div');
  feelslike.classList.add('feelslike');
  feelslike.textContent = 'Feels like';
  const valueOfFeelslike = document.createElement('div');
  valueOfFeelslike.classList.add('value');
  valueOfFeelslike.textContent = `${weatherLists[0].feelslike}°C`;
  // ! end of right top
  const rightBottom = document.createElement('div');
  rightBottom.classList.add('right-bottom');
  const otherDays = document.createElement('div');
  otherDays.classList.add('other-days');

  const choose = document.createElement('div');
  choose.classList.add('choose', 'choosen');

  choose.textContent = getDayFromDate(forecastWeatherLists[0].day1);
  const temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = forecastWeatherLists[0].temp1;

  const forecastImage = document.createElement('img');
  forecastImage.classList.add('right-icon');
  forecastImage.src = forecastWeatherLists[0].icon1;
  choose.appendChild(forecastImage);
  choose.appendChild(temp);
  otherDays.appendChild(choose);
  const choose2 = document.createElement('div');
  choose2.classList.add('choose');
  choose2.textContent = getDayFromDate(forecastWeatherLists[0].day2);
  const temp2 = document.createElement('div');
  temp2.classList.add('temp');
  temp2.textContent = forecastWeatherLists[0].temp2;
  const forecastImage2 = document.createElement('img');
  forecastImage2.classList.add('right-icon');
  forecastImage2.src = forecastWeatherLists[0].icon2;
  choose2.appendChild(forecastImage2);
  choose2.appendChild(temp2);
  otherDays.appendChild(choose2);
  const choose3 = document.createElement('div');
  choose3.classList.add('choose');
  choose3.textContent = getDayFromDate(forecastWeatherLists[0].day3);
  const temp3 = document.createElement('div');
  temp3.classList.add('temp');
  temp3.textContent = forecastWeatherLists[0].temp3;
  const forecastImage3 = document.createElement('img');
  forecastImage3.classList.add('right-icon');
  forecastImage3.src = forecastWeatherLists[0].icon3;
  choose3.appendChild(forecastImage3);
  const choose4 = document.createElement('div');
  choose4.classList.add('choose');
  choose4.textContent = getDayFromDate(forecastWeatherLists[0].day4);
  const temp4 = document.createElement('div');
  temp4.classList.add('temp');
  temp4.textContent = forecastWeatherLists[0].temp4;
  const forecastImage4 = document.createElement('img');
  forecastImage4.classList.add('right-icon');
  forecastImage4.src = forecastWeatherLists[0].icon4;
  choose4.appendChild(forecastImage4);
  const form = document.createElement('form');
  form.classList.add('form');
  const input = document.createElement('input');
  input.id = 'city';
  input.type = 'text';
  input.placeholder = 'Enter a city';
  const btn = document.createElement('button');
  btn.classList.add('button', 'right-btn');
  btn.innerHTML = 'Choose location';

  const left = document.createElement('div');
  left.classList.add('left');
  const leftTop = document.createElement('div');
  leftTop.classList.add('left-top');
  const dayDate = document.createElement('div');
  dayDate.classList.add('dayDate');
  const day = document.createElement('div');
  day.classList.add('day');
  day.textContent = currentDay();
  const date = document.createElement('div');
  date.classList.add('date');
  date.textContent = currentDate();

  const location = document.createElement('div');
  location.classList.add('location');
  location.textContent = `${weatherLists[0].country}, ${weatherLists[0].city}`;

  const image = document.createElement('img');
  image.classList.add('icon');
  image.src = `${weatherLists[0].icon}`;
  const leftBottom = document.createElement('div');
  leftBottom.classList.add('left-bottom');
  const leftTemp = document.createElement('div');
  leftTemp.classList.add('left-temp');
  leftTemp.textContent = `${weatherLists[0].temp}°C`;
  const condition = document.createElement('div');
  condition.classList.add('condition');
  condition.textContent = `${weatherLists[0].condition}`;

  form.appendChild(input);
  form.appendChild(btn);
  choose3.appendChild(temp3);
  choose4.appendChild(temp4);
  otherDays.appendChild(choose3);
  otherDays.appendChild(choose4);
  feelslike.appendChild(valueOfFeelslike);
  humidity.appendChild(valueOfHumidity);
  wind.appendChild(valueOfWind);
  rightTop.appendChild(humidity);
  rightTop.appendChild(wind);
  rightTop.appendChild(feelslike);
  rightBottom.appendChild(otherDays);
  right.appendChild(rightTop);
  right.appendChild(rightBottom);
  right.appendChild(form);

  dayDate.appendChild(day);
  dayDate.appendChild(date);
  leftTop.appendChild(dayDate);
  leftTop.appendChild(location);
  leftBottom.appendChild(leftTemp);
  leftBottom.appendChild(condition);
  left.appendChild(leftTop);
  left.appendChild(image);
  left.appendChild(leftBottom);
  board.appendChild(right);
  board.appendChild(left);
  let counter = 0;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!counter) {
      btn.classList.toggle('right-btn-after-click');
      btn.innerHTML = '<i class="fi fi-rr-search"></i>';
      counter = 1;
    } else {
      new Promise((resolve) => {
        e.preventDefault();
        resolve(input.value);
      })
        .then((city) => {
          runWeather(city);
        })
        .catch((error) => error);
      input.value = '';
      counter = 0;
      btn.classList.toggle('right-btn-after-click');
      btn.innerHTML = 'Choose location';
    }
  });
}

function runWeather(location) {
  getCurrentWeather(location);
  getForecastWeather(location);
}
runWeather(weatherLists[0].city || 'London');
