import { convertUnixDate } from 'assets/constants';
import React from 'react';
import { View, Text } from 'react-native';

interface WeatherInfoProps {
  temperature?: number | '';
  locationName?: string | '';
  locationCountry?: string | '';
  date?: number | '';
  className?: string;
}

const WeatehrLocationTemp: React.FC<WeatherInfoProps> = ({
  temperature,
  locationName,
  locationCountry,
  date,
  className,
}) => {
  return (
    <View className={`mb-6 mt-6 flex-row justify-between p-4 ${className || ''}`}>
      <Text className="text-center text-7xl font-bold text-white">{Math.round(temperature)}°</Text>
      <View className="ml-4 flex-1">
        <Text className="text-right text-3xl font-semibold text-white">
          {locationName} {locationCountry}
        </Text>
        <Text className="text-right text-xl text-white">{convertUnixDate(date)}</Text>
      </View>
    </View>
  );
};

export default WeatehrLocationTemp;
