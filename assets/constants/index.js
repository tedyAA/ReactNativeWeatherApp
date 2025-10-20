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
  Thunderstorm: ['#1F2B3B', '#3A4A57'],
  Drizzle: ['#0090D9', '#004A9E'],
  Rain: ['#0090D9', '#004A9E'],
  Snow: ['#B0C6E0', '#9AB5D1'],
  Mist: ['#0090D9', '#004A9E'],
  Smoke: ['#C5CCD5', '#AAB3BD', '#909CA5'],
  Haze: ['#C5CCD5', '#AAB3BD', '#909CA5'],
  Dust: ['#C5CBC9', '#A1A9A6', '#8A918F'],
  Fog: ['#C5CCD5', '#AAB3BD', '#909CA5'],
  Sand: ['#C2C9C7', '#A3AAA8', '#8C9290'],
  Ash: ['#C2C9C7', '#A3AAA8', '#8C9290'],
  Squall: ['#C2C9C7', '#A3AAA8', '#8C9290'],
  Tornado: ['#2E3035', '#16171A', '#0A0A0C'],
  Clear: ['#5A9BD5', '#007ACC', '#1366A8'],
  Clouds: ['#C5CCD5', '#AAB3BD', '#909CA5'],
  other: ['#0090D9', '#004A9E'],
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
