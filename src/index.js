import './style.css';

const cardHolder = document.querySelector('.other-days');
const rightTop = document.querySelector('.right-top');
const btn = document.querySelector('.button');
const input = document.getElementById('city');
const left = document.querySelector('.left');
const loadingComponent = document.getElementById('loading');
const API = '455bdd01213a436b9d195824230111';
const UnsplashAPI = 'FfbYgIAQmFpgds-JZWM7SCPGNxhkB3TbEXuUtJO0ebE';
const LOCAL_STORAGE_WEATHER_KEY = 'weather.list';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'weather.selectedListId';
const LOCAL_STORAGE_LOCATION_KEY = 'weather.location';
let weatherLists = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_WEATHER_KEY) || '[]'
);
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let locationStorage = localStorage.getItem(LOCAL_STORAGE_LOCATION_KEY);
const now = new Date();
const currentHour = now.getHours();

if (selectedListId === null) {
  selectedListId = 0;
}

let counter = 0;
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!counter) {
    btn.classList.toggle('right-btn-after-click');
    btn.innerHTML = '<i class="fi fi-rr-search"></i>';
    counter = 1;
  } else {
    if (input.value === '') {
      return;
    }
    locationStorage = input.value;
    getCurrentWeather(locationStorage);

    counter = 0;
    input.value = '';
    btn.classList.toggle('right-btn-after-click');
    btn.innerHTML = 'Choose location';
    selectedListId = 0;
  }
});

cardHolder.addEventListener('click', (e) => {
  selectedListId = e.target.id;
  saveAndRender();
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );
  const year = date.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

function getDayFromDate(dateInput) {
  const date = new Date(dateInput);
  const options = { weekday: 'long' };
  const day = date.toLocaleDateString('en-US', options);

  return day;
}
async function getCurrentWeather(userInput) {
  loadingComponent.style.display = 'block';
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${userInput}&days=4&hour=${currentHour}`,
      { mode: 'cors' }
    );
    const weatherJson = await weather.json();
    for (let i = 0; i < 3; i += 1) {
      const list = createList(weatherJson, i);
      const fullList = createFull(weatherJson, i);
      list.full = fullList;
      weatherLists.push(list);
    }
    weatherLists = weatherLists.slice(-3);
    getPic(userInput);
    saveAndRender();
    // loadingComponentDisplayNone();
  } catch (error) {
    alert('City not found');
    loadingComponentDisplayNone();
  }
}

async function loadingComponentDisplayNone() {
  loadingComponent.style.transition = 'all 0.5s ease-out';
  loadingComponent.style.display = '';
}

function createList(Json, num) {
  return {
    id: num,
    icon: Json.forecast.forecastday[num].hour[0].condition.icon,
    date: Json.forecast.forecastday[num].date,
    temp: Json.forecast.forecastday[num].hour[0].temp_c,
    full: {},
  };
}
function createFull(Json, num) {
  return {
    id: Date.now().toString(),
    humidity: Json.forecast.forecastday[num].hour[0].humidity,
    wind: Json.forecast.forecastday[num].hour[0].wind_kph,
    feelslike: Json.forecast.forecastday[num].hour[0].feelslike_c,
    date: Json.forecast.forecastday[num].date,
    city: Json.location.name,
    country: Json.location.country,
    icon: Json.forecast.forecastday[num].hour[0].condition.icon,
    temp: Json.forecast.forecastday[num].hour[0].temp_c,
    condition: Json.forecast.forecastday[num].hour[0].condition.text,
  };
}

function clearList(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_WEATHER_KEY, JSON.stringify(weatherLists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
  localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, locationStorage);
}

function saveAndRender() {
  save();
  renderCard();
}

function renderCard() {
  clearList(cardHolder);
  weatherLists.forEach((list) => {
    const dayChanger = document.createElement('div');

    dayChanger.id = list.id;
    dayChanger.classList.add('choose');
    dayChanger.innerText = getDayFromDate(list.date).slice(0, 3);
    const icon = document.createElement('img');
    icon.src = list.icon;
    icon.classList.add('right-icon');
    icon.id = list.id;
    const temp = document.createElement('div');
    temp.classList.add('temp');
    temp.innerText = `${list.temp}°C`;
    if (list.id === +selectedListId) {
      dayChanger.classList.add('choosen');
    }

    dayChanger.appendChild(icon);
    dayChanger.appendChild(temp);
    cardHolder.append(dayChanger);
  });
  const selectedList = weatherLists.find((list) => list.id === +selectedListId);

  renderFull(selectedList.full);
  LeftRender(selectedList.full);
}
// renderCard();

function renderFull(list) {
  clearList(rightTop);

  const humidity = document.createElement('div');
  humidity.classList.add('humidity');
  humidity.innerText = 'Humidity';
  const humidityValue = document.createElement('div');
  humidityValue.classList.add('value');
  humidityValue.innerText = `${list.humidity}%`;
  const wind = document.createElement('div');
  wind.innerText = 'Wind';
  wind.classList.add('wind');
  const windValue = document.createElement('div');
  windValue.classList.add('value');
  windValue.innerText = `${list.wind} km/h`;
  const feelslike = document.createElement('div');
  feelslike.innerText = 'Feels like';
  feelslike.classList.add('feelslike');
  const feelslikeValue = document.createElement('div');
  feelslikeValue.classList.add('value');
  feelslikeValue.innerText = `${list.feelslike}°C`;
  humidity.appendChild(humidityValue);
  wind.appendChild(windValue);
  feelslike.appendChild(feelslikeValue);
  rightTop.appendChild(humidity);
  rightTop.appendChild(wind);
  rightTop.appendChild(feelslike);
}

function LeftRender(list) {
  clearList(left);
  const leftTop = document.createElement('div');
  leftTop.classList.add('left-top');
  const dayDate = document.createElement('div');
  dayDate.classList.add('dayDate');
  const day = document.createElement('div');
  day.classList.add('day');
  day.innerText = getDayFromDate(list.date);
  const date = document.createElement('div');
  date.classList.add('date');
  date.innerText = formatDate(list.date);
  const icon = document.createElement('img');
  icon.src = list.icon;
  icon.classList.add('icon');
  const temp = document.createElement('div');
  temp.classList.add('left-temp');
  temp.innerText = `${list.temp}°C`;
  const condition = document.createElement('div');
  condition.classList.add('condition');
  condition.innerText = list.condition;
  const location = document.createElement('div');
  location.classList.add('location');
  location.innerText = `${list.city}, ${list.country}`;
  const leftBottom = document.createElement('div');
  leftBottom.classList.add('left-bottom');

  dayDate.appendChild(day);
  dayDate.appendChild(date);
  dayDate.appendChild(location);
  leftTop.appendChild(dayDate);
  leftBottom.appendChild(temp);
  leftBottom.appendChild(condition);
  left.appendChild(leftTop);
  left.appendChild(leftBottom);
}

async function getPic(userInput) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?query=${userInput}&client_id=${UnsplashAPI}&orientation=portrait`
    );
    if (response.ok) {
      const Data = await response.json();
      const image = `${
        Data.results[getRandomNumber(Data.results.length)].urls.full
      }&w=540`;
      load(image)
        .then(() => {
          left.style.backgroundImage = `url(${image})`;
        })
        .then(() => {
          loadingComponentDisplayNone();
        });
    } else {
      alert('Failed');
    }
    saveAndRender();
  } catch (error) {
    alert(error);
  }
}

const successCallback = async (position) => {
  if (!locationStorage) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );
    // store response object
    const data = await response.json();
    const location = data.address.city;
    locationStorage = location;
    localStorage.setItem(LOCAL_STORAGE_LOCATION_KEY, locationStorage);
    getCurrentWeather(locationStorage);
    console.log('succsec');
  } else {
    getCurrentWeather(locationStorage);
  }
};

const errorCallback = (error) => {
  if (!locationStorage) {
    alert(
      "Can't find your location so we will show you Paris, plase give permission",
      error
    );
    getCurrentWeather('Paris');
  } else {
    getCurrentWeather(locationStorage);
  }
};
// !FInding User Location
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function getRandomNumber(length) {
  return Math.floor(Math.random() * length);
}
// left.addEventListener('load', () => {
//   loadingComponentDisplayNone();
//   console.log('window loaded');
// });

function load(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
}
