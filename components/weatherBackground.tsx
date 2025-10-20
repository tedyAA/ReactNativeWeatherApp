import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../assets/constants';

interface WeatherGradientProps {
  weather?: string;
}

const WeatherGradient: React.FC<WeatherGradientProps> = ({ weather = 'other' }) => {
  const colors = gradients[weather as keyof typeof gradients] || gradients.other;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default WeatherGradient;
