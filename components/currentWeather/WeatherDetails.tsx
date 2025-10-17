import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { convertUnixTime } from 'assets/constants';

interface WeatherDetailProps {
  windSpeed?: number;
  humidity?: number;
  sunrise?: number;
  sunset?: number;
  description?: string;
  className?: string;
}

const WeatherDetails: React.FC<WeatherDetailProps> = ({
  windSpeed,
  humidity,
  sunrise,
  sunset,
  description,
  className,
}) => {
  // Define individual icons for each data type
  const icons = {
    wind: require('../../assets/images/icons/wind.png'),
    humidity: require('../../assets/images/icons/drop.png'),
    sunrise: require('../../assets/images/icons/sunrise.png'),
    sunset: require('../../assets/images/icons/sunset.png'),
  };

  const detailItems = [
    { label: `${windSpeed ?? '--'} km`, icon: icons.wind, className: 'h-6 w-6 mb-3 mt-3' },
    { label: `${humidity ?? '--'}%`, icon: icons.humidity, className: 'h-6 w-6 mb-3 mt-3' },
    {
      label: `${sunrise ? convertUnixTime(sunrise) + ' AM' : '--'}`,
      icon: icons.sunrise,
      className: 'h-12 w-12',
    },
    {
      label: `${sunset ? convertUnixTime(sunset) + ' PM' : '--'}`,
      icon: icons.sunset,
      className: 'h-12 w-12',
    },
  ];

  return (
    <View>
      {description && (
        <Text className="text-bold mb-5 text-center text-5xl font-bold text-white">
          {description}
        </Text>
      )}
      <View className={`mx-4 mb-6 flex-row justify-between`}>
        {detailItems.map((item, index) => (
          <View key={index} className="items-center space-x-2">
            <Image source={item.icon} className={`${item.className}`} />
            <Text className="text-base font-semibold text-white">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeatherDetails;
