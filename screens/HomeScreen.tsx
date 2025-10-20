import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce, isEmpty } from 'lodash';
import { fetchForecast, fetchLocations, fetchSuggestions } from 'assets/api/weather';
import { weatherImages } from 'assets/constants';
import WeatherImage from 'components/currentWeather/WeatherImage';
import WeatherDetails from 'components/currentWeather/WeatherDetails';
import Forecast from 'components/forecasrt/Forecast';
import WeatehrLocationTemp from 'components/currentWeather/WeatherLocationTemp';
import LoadingScreen from 'components/loading/LoadingScreen';
import WeatherGradient from 'components/weatherBackground';
import ErrorScreen from 'components/error/ErrorScreen';
import axios from 'axios';

export default function HomeScreen() {
  interface WeatherData {
    main: { humidity: number; temp: number };
    name: string;
    dt: number;
    sys: { country: string; sunrise: number; sunset: number };
    weather: [{ main: string }];
    wind: { speed: number };
  }

  const [location, setLocation] = useState<WeatherData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const theme = { bgWhite: (opacity: number) => `rgba(255, 255, 255, ${opacity})` };

  // Fetch city suggestions from OpenWeather Geocoding API
  const fetchCitySuggestions = async (text: string) => {
    if (text.length < 2) return setSuggestions([]);
    try {
      const res = await fetchSuggestions({ query: text });
      setSuggestions(res || []);
    } catch (err) {
      console.error('Error fetching city suggestions:', err);
      setSuggestions([]);
    }
  };

  const handleSearch = debounce(async (value: string) => {
    if (value.length <= 2) return;

    try {
      setLocationLoading(true);
      setForecastLoading(true);
      setError(null);

      const locationData = await fetchLocations({ query: value });
      if (!locationData || !locationData.weather) {
        setError('No weather data found');
        setLocation(null);
        return;
      }
      setLocation(locationData);

      const forecastData = await fetchForecast({ query: value });
      const formattedData = forecastData.list.filter((_: any, index: number) => index % 8 === 0);
      setForecast(formattedData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setTimeout(() => {
        setLocationLoading(false);
        setForecastLoading(false);
      }, 500);
    }
  }, 500);

  useEffect(() => {
    handleSearch('Sofia');
    handleSearch.flush();
  }, []);

  return (
    <View className="relative flex-1 bg-black">
      <StatusBar style="light" />
      <WeatherGradient weather={location?.weather[0]?.main} />

      <SafeAreaView className="mt-5 flex-1 pt-4">
        <View className="z-50 mx-4 mt-4">
          <View className={`flex-row items-center rounded-full bg-white/20 px-4`}>
            <TextInput
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                fetchCitySuggestions(text);
              }}
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

          {suggestions.length > 0 && (
            <View className="absolute left-0 right-0 top-14 z-50 rounded-md bg-black/80">
              <FlatList
                data={suggestions}
                keyExtractor={(item) => `${item.lat}-${item.lon}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setQuery(item.name);
                      setSuggestions([]);
                      handleSearch(item.name);
                    }}
                    className="border-b border-gray-600 p-3">
                    <Text className="text-white">
                      {item.name}, {item.country}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <ScrollView className="mx-4 mt-6 flex-1">
          {locationLoading && <LoadingScreen />}
          {error && !locationLoading && isEmpty(location) && <ErrorScreen />}
          {!isEmpty(location) &&
            !locationLoading &&
            location.weather &&
            location.weather.length > 0 && (
              <View>
                <WeatehrLocationTemp
                  temperature={location?.main?.temp}
                  locationCountry={location?.sys?.country}
                  locationName={location?.name}
                  date={location?.dt}
                />
                <View className="flex-row justify-center">
                  <WeatherImage
                    source={
                      weatherImages[location?.weather[0]?.main as keyof typeof weatherImages] ||
                      weatherImages['other']
                    }
                    className="h-64 w-64"
                  />
                </View>
                <WeatherDetails
                  windSpeed={location?.wind?.speed}
                  humidity={location?.main?.humidity}
                  description={location?.weather[0]?.main}
                  sunrise={location?.sys?.sunrise}
                  sunset={location?.sys?.sunset}
                />
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
