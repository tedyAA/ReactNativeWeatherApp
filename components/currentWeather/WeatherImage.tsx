import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface WeatherImageProps {
  source: ImageSourcePropType;
  className?: string;
}

const WeatherImage: React.FC<WeatherImageProps> = ({ source, className }) => {
  return <Image source={source} className={className || 'h-32 w-32'} />;
};

export default WeatherImage;
