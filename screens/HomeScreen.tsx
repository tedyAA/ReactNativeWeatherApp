import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce, isEmpty } from 'lodash';
import { fetchForecast, fetchLocations } from 'assets/api/weather';
import { convertUnixTime, weatherImages } from 'assets/constants';
import { Button } from 'react-native';

export default function HomeScreen() {
  interface WeatherData {
    main: {
      humidiry: string;
      temp: number;
    };
    name: string;
    sys: {
      country: string;
      sunrise: string;
      sunset: string;
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

  const [showSearch, toggleSearch] = useState(false);
  const [location, setLocation] = useState<WeatherData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const theme = {
    bgWhite: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
  };

  const handleSearch = debounce((value: string) => {
    if (value.length > 2) {
      setLocationLoading(true);
      fetchLocations({ query: value })
        .then((data) => {
          setLocation(data);
          console.log(isEmpty(location));
          setLocationLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching locations:', error);
        });
    }
  }, 500);
  // const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  // const { current, location } = weather;

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
          <View
            className={`flex-row items-center rounded-full px-4 ${
              showSearch ? 'bg-white/20' : 'bg-transparent'
            }`}>
            {showSearch && (
              <TextInput
                onChangeText={handleSearch}
                placeholder="Search City"
                placeholderTextColor="lightgray"
                className="h-10 flex-1 pl-4 text-base text-white"
              />
            )}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
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
              <Text className="text-center text-3xl font-bold text-white">
                {location?.name},{' '}
                <Text className="text-xl font-light">{location?.sys?.country}</Text>
              </Text>
              {/* Weather Image */}
              <View className="my-4 flex-row justify-center">
                <Image
                  source={
                    weatherImages[location?.weather[0]?.main as keyof typeof weatherImages] ||
                    weatherImages['other']
                  }
                  className="h-32 w-32"
                />
              </View>
              {/* Temperature */}
              <View className="mb-6 space-y-2">
                <Text className="text-center text-6xl font-bold text-white">
                  {location?.main?.temp}
                </Text>
                <Text className="text-center text-xl tracking-widest text-white">
                  {location?.weather[0]?.main}
                </Text>
              </View>
              {/* Details */}
              <View className="mx-4 mb-6 flex-row justify-between">
                <View className="flex-row items-center space-x-2">
                  <Image source={require('../assets/images/icons/wind.png')} className="h-6 w-6" />
                  <Text className="text-base font-semibold text-white">
                    {location?.wind?.speed} km
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2">
                  <Image source={require('../assets/images/icons/wind.png')} className="h-6 w-6" />
                  <Text className="text-base font-semibold text-white">
                    {location?.main[0]?.humidity}%
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2">
                  <Image source={require('../assets/images/icons/wind.png')} className="h-6 w-6" />
                  <Text className="text-base font-semibold text-white">
                    {convertUnixTime(location?.sys?.sunrise)} AM
                  </Text>
                </View>
                <View className="flex-row items-center space-x-2">
                  <Image source={require('../assets/images/icons/wind.png')} className="h-6 w-6" />
                  <Text className="text-base font-semibold text-white">
                    {convertUnixTime(location?.sys?.sunset)} PM
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
