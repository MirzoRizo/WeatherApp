const board = document.getElementById('weather');
const API = '455bdd01213a436b9d195824230111';
const LOCAL_STORAGE_WEATHER_KEY = 'weather.list';
let weatherLists = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_WEATHER_KEY) || '[]'
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

function getDayFromDate(dateInput) {
  const date = new Date(dateInput);
  const options = { weekday: 'long' };
  const day = date.toLocaleDateString('en-US', options);

  return day.slice(0, 3);
}

async function getCurrentWeather(userInput) {
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${userInput}&days=4&hour=9`,
      { mode: 'cors' }
    );
    const weatherJson = await weather.json();
    const readyToUseJson = currentWeather(weatherJson);
    weatherLists.push(readyToUseJson);
    weatherLists = weatherLists.filter((item) => item.id === readyToUseJson.id);
    saveAndRender();
    return readyToUseJson;
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
  const day1 = Json.forecast.forecastday[0].date;
  const day2 = Json.forecast.forecastday[1].date;
  const day3 = Json.forecast.forecastday[2].date;
  const day4 = Json.forecast.forecastday[3].date;
  const icon1 = Json.current.condition.icon;
  const icon2 = Json.forecast.forecastday[1].day.condition.icon;
  const icon3 = Json.forecast.forecastday[2].day.condition.icon;
  const icon4 = Json.forecast.forecastday[3].day.condition.icon;
  const temp1 = Json.current.temp_c;
  const temp2 = Json.forecast.forecastday[1].day.avgtemp_c;
  const temp3 = Json.forecast.forecastday[2].day.avgtemp_c;
  const temp4 = Json.forecast.forecastday[3].day.avgtemp_c;
  const filselike1 = Json.current.feelslike_c;
  const filselike2 = Json.forecast.forecastday[1].day.avgtemp_c;
  const filselike3 = Json.forecast.forecastday[2].day.avgtemp_c;
  const filselike4 = Json.forecast.forecastday[3].day.avgtemp_c;
  const wind1 = Json.current.wind_kph;
  const wind2 = Json.forecast.forecastday[1].day.avgtemp_c;
  const wind3 = Json.forecast.forecastday[2].day.avgtemp_c;
  const wind4 = Json.forecast.forecastday[3].day.avgtemp_c;
  const humidity1 = Json.current.humidity;
  const humidity2 = Json.forecast.forecastday[1].hour[0].humidity;
  const humidity3 = Json.forecast.forecastday[2].hour[0].humidity;
  const humidity4 = Json.forecast.forecastday[3].hour[0].humidity;
  const condition1 = Json.current.condition.text;
  const condition2 = Json.forecast.forecastday[1].day.condition.text;
  const condition3 = Json.forecast.forecastday[2].day.condition.text;
  const condition4 = Json.forecast.forecastday[3].day.condition.text;
  return {
    country,
    city,
    temp,
    condition,
    icon,
    humidity,
    wind,
    feelslike,
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
    filselike1,
    filselike2,
    filselike3,
    filselike4,
    wind1,
    wind2,
    wind3,
    wind4,
    humidity1,
    humidity2,
    humidity3,
    humidity4,
    condition1,
    condition2,
    condition3,
    condition4,
    id,
  };
}

function saveAndRender() {
  localStorage.setItem(LOCAL_STORAGE_WEATHER_KEY, JSON.stringify(weatherLists));
  renderWeather();
}

function clearList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function rightContentRender() {
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

  for (let i = 1; i < 5; i += 1) {
    const choose = document.createElement('div');
    if (i === 1) {
      choose.classList.add('choosen');
    }
    choose.classList.add('choose');
    choose.textContent = getDayFromDate(weatherLists[0][`day${i}`]);
    choose.id = i;
    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.textContent = `${weatherLists[0][`temp${i}`]}°C`;
    const forecastImage = document.createElement('img');
    forecastImage.classList.add('right-icon');
    forecastImage.src = weatherLists[0][`icon${i}`];

    choose.appendChild(forecastImage);
    choose.appendChild(temp);
    otherDays.appendChild(choose);
  }
  console.log(otherDays);

  otherDays.addEventListener('click', (e) => {
    console.log(e.target.id);
    const { childNodes } = otherDays;
    const choosenClass = 'choosen';

    for (let i = 0; i < childNodes.length; i++) {
      if (e.target.id === `${i + 1}`) {
        childNodes[i].classList.add(choosenClass);
      } else {
        childNodes[i].classList.remove(choosenClass);
      }
    }
  });

  const form = document.createElement('form');
  form.classList.add('form');
  const input = document.createElement('input');
  input.id = 'city';
  input.type = 'text';
  input.placeholder = 'Enter a city';
  const btn = document.createElement('button');
  btn.classList.add('button', 'right-btn');
  btn.innerHTML = 'Choose location';

  form.appendChild(input);
  form.appendChild(btn);
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
          getCurrentWeather(city);
        })
        .catch((error) => error);
      input.value = '';
      counter = 0;
      btn.classList.toggle('right-btn-after-click');
      btn.innerHTML = 'Choose location';
    }
  });
  return right;
}

function leftContentRender() {
  const left = document.createElement('div');
  left.classList.add('left');
  const leftTop = document.createElement('div');
  leftTop.classList.add('left-top');
  const dayDate = document.createElement('div');
  dayDate.classList.add('dayDate');
  const day = document.createElement('div');
  day.classList.add('day');
  day.textContent = getDayFromDate(weatherLists[0].day1);
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

  dayDate.appendChild(day);
  dayDate.appendChild(date);
  leftTop.appendChild(dayDate);
  leftTop.appendChild(location);
  leftBottom.appendChild(leftTemp);
  leftBottom.appendChild(condition);
  left.appendChild(leftTop);
  left.appendChild(image);
  left.appendChild(leftBottom);
  return left;
}
function renderWeather() {
  clearList(board);
  // ! start of right top
  const right = rightContentRender();
  const left = leftContentRender();
  board.appendChild(right);
  board.appendChild(left);
}

getCurrentWeather('dushanbe');
getCurrentWeather(weatherLists[0].city);
