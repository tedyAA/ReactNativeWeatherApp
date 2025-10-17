import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { weatherImages, getWeekdayAbbrev } from 'assets/constants';

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { main: string }[];
}

interface ForecastScrollProps {
  forecast: ForecastItem[];
  bgWhite: (opacity: number) => string; // theme function
}

const Forecast: React.FC<ForecastScrollProps> = ({ forecast, bgWhite }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15 }}>
      {forecast.map((item, i) => {
        const weatherKey = item?.weather[0]?.main as keyof typeof weatherImages;
        const imageSource = weatherImages[weatherKey] || weatherImages['other'];

        return (
          <View
            key={i}
            className="h-34 mr-4 flex w-24 items-center justify-center space-y-1 rounded-3xl py-3"
            style={{ backgroundColor: bgWhite(0.15) }}>
            <Text className="text-white">{getWeekdayAbbrev(item?.dt)}</Text>
            <Image source={imageSource} className="h-14 w-14" />
            <Text className="text-center text-lg font-bold text-white">
              {Math.round(item?.main?.temp)}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Forecast;
