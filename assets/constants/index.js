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

export function convertUnixTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function getWeekdayAbbrev(unixTime) {
  const date = new Date(unixTime * 1000);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return weekdays[date.getDay()];
}
