export const weatherImages = {
  Thunderstorm: require('../images/heavyrain.png'),
  Drizzle: require('../images/moderaterain.png'),
  Rain: require('../images/heavyrain.png'),
  Snow: require('../images/snow.png'),
  Mist: require('../images/moderaterain.png'),
  Smoke: require('../images/cloud.png'),
  Haze: require('../images/cloud.png'),
  Dust: require('../images/cloud.png'),
  Fog: require('../images/cloud.png'),
  Sand: require('../images/mist.png'),
  Ash: require('../images/mist.png'),
  Squall: require('../images/mist.png'),
  Tornado: require('../images/tornado.png'),
  Clear: require('../images/sun.png'),
  Clouds: require('../images/cloud.png'),
  other: require('../images/moderaterain.png'),
};

export const gradients = {
  Thunderstorm: ['#283E51', '#485563'],
  Drizzle: ['#00C6FB', '#005BEA'],
  Rain: ['#00C6FB', '#005BEA'],
  Snow: ['#E0EAFC', '#CFDEF3'],
  Mist: ['#00C6FB', '#005BEA'],
  Smoke: ['#E0E6ED', '#C9D3DD', '#B0BEC5'],
  Haze: ['#E0E6ED', '#C9D3DD', '#B0BEC5'],
  Dust: ['#E0E6ED', '#C9D3DD', '#B0BEC5'],
  Fog: ['#E0E6ED', '#C9D3DD', '#B0BEC5'],
  Sand: ['#DDE3E1', '#BFC8C6', '#AAB0AE'],
  Ash: ['#DDE3E1', '#BFC8C6', '#AAB0AE'],
  Squall: ['#DDE3E1', '#BFC8C6', '#AAB0AE'],
  Tornado: ['#3A3D42', '#1F2126', '#0D0F12'],
  Clear: ['#87CEFA', '#00BFFF', '#1E90FF'],
  Clouds: ['#E0E6ED', '#C9D3DD', '#B0BEC5'],
  other: ['#00C6FB', '#005BEA'],
};

export function convertUnixTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function convertUnixDate(unixTime) {
  const date = new Date(unixTime * 1000);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayName = weekdays[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];
  return `${dayName}, ${dayNumber} ${monthName}`;
}

export function getWeekdayAbbrev(unixTime) {
  const date = new Date(unixTime * 1000);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return weekdays[date.getDay()];
}
