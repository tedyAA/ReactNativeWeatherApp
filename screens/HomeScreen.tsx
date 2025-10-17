import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce, isEmpty } from 'lodash';
import { fetchForecast, fetchLocations } from 'assets/api/weather';
import { weatherImages } from 'assets/constants';
import WeatherImage from 'components/currentWeather/WeatherImage';
import WeatherDetails from 'components/currentWeather/WeatherDetails';
import Forecast from 'components/forecasrt/Forecast';
import WeatehrLocationTemp from 'components/currentWeather/WeatherLocationTemp';

export default function HomeScreen() {
  interface WeatherData {
    main: {
      humidity: number;
      temp: number;
    };
    name: string;
    dt: number;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    weather: [
      {
        main: string;
      },
    ];
    wind: {
      speed: number;
    };
  }

  const [location, setLocation] = useState<WeatherData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [forecstLoading, setForecastLoading] = useState(true);
  const [forecast, setForecast] = useState({});

  const theme = {
    bgWhite: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
  };

  const handleSearch = debounce(async (value: string) => {
    if (value.length <= 2) return;

    try {
      setLocationLoading(true);
      setForecastLoading(true);

      const locationData = await fetchLocations({ query: value });
      setLocation(locationData);

      const forecastData = await fetchForecast({ query: value });
      const formattedData = forecastData.list.filter((_: any, index: number) => index % 8 === 0);

      setForecast(formattedData);

      console.log('Formatted Forecast:', formattedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLocationLoading(false);
      setForecastLoading(false);
    }
  }, 500);

  return (
    <View className="relative flex-1 bg-black">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="mt-5 flex-1 pt-4">
        <View className="z-50 mx-4 mt-4">
          <View className={`flex-row items-center rounded-full bg-white/20 px-4`}>
            <TextInput
              onChangeText={handleSearch}
              placeholder="Search City"
              placeholderTextColor="lightgray"
              className="h-10 flex-1 pl-4 text-base text-white"
            />
            <TouchableOpacity
              className="ml-2 rounded-full p-3"
              style={{ backgroundColor: theme.bgWhite(0.3) }}>
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView className="mx-4 mt-6 flex-1">
          {/* Location */}
          {locationLoading && <Text className="text-xl text-white">Loading....</Text>}
          {!isEmpty(location) && !locationLoading && (
            <View>
              {/* Weather Temperature and Location */}
              <WeatehrLocationTemp
                temperature={location?.main?.temp}
                locationCountry={location?.sys?.country}
                locationName={location?.name}
                date={location?.dt}
              />
              {/* Weather Image */}
              <View className="flex-row justify-center">
                <WeatherImage
                  source={
                    weatherImages[location?.weather[0]?.main as keyof typeof weatherImages] ||
                    weatherImages['other']
                  }
                  className="h-64 w-64"
                />
              </View>

              {/* Details */}
              <WeatherDetails
                windSpeed={location?.wind?.speed}
                humidity={location?.main?.humidity}
                description={location?.weather[0]?.main}
                sunrise={location?.sys?.sunrise}
                sunset={location?.sys?.sunset}
              />

              {/* Daily Forecast */}
              <View className="mx-3 mb-4 flex-row items-center space-x-2">
                <CalendarDaysIcon size={22} color="white" />
                <Text className="ml-3 text-base font-semibold text-white">Daily forecast</Text>
              </View>

              <Forecast forecast={forecast} bgWhite={theme.bgWhite} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
