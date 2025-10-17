import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { convertUnixTime } from 'assets/constants';

interface WeatherDetailProps {
  windSpeed?: number;
  humidity?: number;
  sunrise?: number;
  sunset?: number;
  icon?: ImageSourcePropType;
  className?: string;
}

const WeatherDetails: React.FC<WeatherDetailProps> = ({
  windSpeed,
  humidity,
  sunrise,
  sunset,
  icon = require('../../assets/images/icons/wind.png'),
  className,
}) => {
  const detailItems = [
    { label: `${windSpeed ?? '--'} km`, icon },
    { label: `${humidity ?? '--'}%`, icon },
    { label: `${sunrise ? convertUnixTime(sunrise) + ' AM' : '--'}`, icon },
    { label: `${sunset ? convertUnixTime(sunset) + ' PM' : '--'}`, icon },
  ];

  return (
    <View className={`mx-4 mb-6 flex-row justify-between ${className || ''}`}>
      {detailItems.map((item, index) => (
        <View key={index} className="flex-row items-center space-x-2">
          <Image source={item.icon} className="h-6 w-6" />
          <Text className="text-base font-semibold text-white">{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default WeatherDetails;
