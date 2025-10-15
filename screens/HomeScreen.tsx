import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc: string) => console.log(loc);

  const theme = {
    bgWhite: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
  };

  const forecastData = Array(7).fill({
    day: "Mon",
    temp: 23,
    icon: require("../assets/images/heavyrain.png"),
  });

  return (
    <View className="flex-1 relative bg-black">
      <StatusBar style="light" />

      {/* Background */}
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
      />

      <SafeAreaView className="flex-1 pt-5">
        {/* Search */}
        <View className="mx-4 mt-4 z-50">
          <View
            className={`flex-row items-center rounded-full px-4 ${
              showSearch ? "bg-white/20" : "bg-transparent"
            }`}
          >
            {showSearch && (
              <TextInput
                placeholder="Search City"
                placeholderTextColor="lightgray"
                className="flex-1 h-10 text-white text-base pl-4"
              />
            )}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="p-3 rounded-full ml-2"
              style={{ backgroundColor: theme.bgWhite(0.3) }}
            >
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Locations Dropdown */}
          {showSearch && locations.length > 0 && (
            <View className="absolute top-16 w-full bg-gray-200/90 rounded-3xl py-2">
              {locations.map((loc, i) => (
                <TouchableOpacity
                  key={i}
                  className="flex-row items-center border-b border-gray-400 py-3 px-4"
                  onPress={() => handleLocation(String(loc))}
                >
                  <MapPinIcon size={20} color="gray" />
                  <Text className="ml-2 text-black text-lg">
                    London, United Kingdom
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Main Weather Info */}
        <ScrollView className="flex-1 mx-4 mt-6">
          {/* Location */}
          <Text className="text-white text-center text-2xl font-bold">
            London,{" "}
            <Text className="text-gray-300 text-lg font-semibold">
              United Kingdom
            </Text>
          </Text>

          {/* Weather Image */}
          <View className="flex-row justify-center my-4">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-32 h-32"
            />
          </View>

          {/* Temperature */}
          <View className="space-y-2 mb-6">
            <Text className="text-center text-white text-6xl font-bold">
              23°
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Partly cloudy
            </Text>
          </View>

          {/* Details */}
          <View className="flex-row justify-between mx-4 mb-6">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">22 km</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/icons/drop.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">22%</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../assets/images/icons/sun.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">6:05 AM</Text>
            </View>
          </View>

          {/* Daily Forecast */}
          <View className="flex-row items-center mb-4 space-x-2 mx-5">
            <CalendarDaysIcon size={22} color="white" />
            <Text className="text-white text-base font-semibold">
              Daily forecast
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {forecastData.map((item, i) => (
              <View
                key={i}
                className="flex justify-center items-center w-24 h-34 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
              >
                <Image source={item.icon} className="w-11 h-11" />
                <Text className="text-white">{item.day}</Text>
                <Text className="text-white text-xl font-semibold">
                  {item.temp}°
                </Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
