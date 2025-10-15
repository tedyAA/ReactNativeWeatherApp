import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([1, 2, 3]);

  const handleLocation = (loc: string) => {
    console.log(loc);
  };

  return (
    <View className="flex-1 relative bg-black">
      {/* Background */}
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="flex-1">
        <StatusBar style="light" />

        {/* Search Bar */}
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
                className="flex-1 h-10 text-white text-base pl-2"
              />
            )}
            <TouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              className="rounded-full p-3 ml-2 bg-white/30"
            >
              <MagnifyingGlassIcon size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Locations Dropdown */}
          {locations.length > 0 && showSearch && (
            <View className="absolute top-16 w-full bg-gray-200/95 rounded-3xl py-2">
              {locations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center border-b border-gray-400 py-3 px-4"
                  onPress={() => handleLocation(String(loc))}
                >
                  <MapPinIcon size={20} color="gray" />
                  <Text className="text-black text-lg ml-2">
                    London, United Kingdom
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Weather Info */}
        <View className="mx-4 flex justify-around flex-1 mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            London,{" "}
            <Text className="text-lg font-semibold text-gray-300">
              United Kingdom
            </Text>
          </Text>

          <View className="flex-row justify-center">
            <Image
              source={require("../assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </View>

          <View className="space-y-2">
            <Text className="text-center font-bold text-white text-6xl">
              23°
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Partly cloudy
            </Text>
          </View>

          <View className="flex-row justify-between mx-4">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/icons/wind.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/icons/drop.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">22%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/images/icons/sun.png")}
                className="h-6 w-6"
              />
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
