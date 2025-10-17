import React from 'react';
import { View, Text } from 'react-native';

interface WeatherInfoProps {
  temperature?: number | null;
  description?: string | null;
  className?: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ temperature, description, className }) => {
  return (
    <View className={`mb-6 space-y-2 ${className || ''}`}>
      <Text className="text-center text-6xl font-bold text-white">{temperature ?? '--'}</Text>
      <Text className="text-center text-xl tracking-widest text-white">{description ?? '--'}</Text>
    </View>
  );
};

export default WeatherInfo;
