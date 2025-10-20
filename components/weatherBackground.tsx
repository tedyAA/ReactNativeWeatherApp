import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
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
      resizeMode="cover">
      <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' }} />
    </ImageBackground>
  );
};

export default WeatherBackground;
