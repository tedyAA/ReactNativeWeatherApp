import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { weatherBg } from '../assets/constants';

interface WeatherBackgroundProps {
  weather?: string;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weather = 'other' }) => {
  const backgroundImage = weatherBg[weather as keyof typeof weatherBg] || weatherBg.other;

  return (
    <ImageBackground
      source={backgroundImage}
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    />
  );
};

export default WeatherBackground;
